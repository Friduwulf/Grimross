import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/db/db";
import { formatNumber } from "@/lib/formatters";

//Get a specific product by it's ID and returns an error message if no product is found
async function getProduct(productID: string) {
    const product = await prisma.product.findUnique({
        where: {
            id: productID
        },
    });

    if (!product) {
        throw new Error('Product not found!');
    }
    return product;
}
//Get all of the rows in products table
async function getProductsData() {
   const data = await prisma.product.findMany()

   return data;
}
//Get all batches from the batches table that are not currently empty (batches still in production)
async function getBatchesData() {
    const data = await prisma.batch.findMany({
        where: {
            isEmpty: false
        },
    });

    return data;
}
//Get all of the rows in customers table
async function getCustomerData() {
    try{
        //Gives 2 serparate operations in one call to the db
        const [topCustomers, totalKegs] = await prisma.$transaction([
            //Finds all customers in db, orders by kegs on hand in descending order, then takes the top 10
            prisma.customer.findMany({
                orderBy: {
                    kegsOnHand: 'desc',
                },
                take: 10,
            }),
            //Sums all values in the kegs on hand column.
            prisma.customer.aggregate({
                _sum: {
                    kegsOnHand: true,
                },
            }),
        ]);

        return {topCustomers, totalKegs: totalKegs._sum.kegsOnHand || 0};
    } catch (error) {
        console.error('Error fetching data:',error);
        alert('An error occured while fetching data. Please try again later')
    }
 }
//Creates the dashboard cards
export default async function AdminDashboard() {
    const products = await getProductsData()
    const batches = await getBatchesData()
    const customers = await getCustomerData()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{/* Creates a product inventory card for each of the products in the products table */}  
            <Card>
            <CardHeader>
                <CardTitle>Inventory Quick Look</CardTitle>
            </CardHeader>
                <div className="grid grid-cols-1 gap-0">
                    {products.map((product) => (
                        <InventoryCard
                            key={product.id}
                            name={product.name}
                            kegInventory={formatNumber(product.inventory_20L || 0)} //Gives inventory of 20L kegs, or 0 if there are none
                            canInventory={formatNumber(product.inventory_473ml || 0)} //Gives inventory of 473ml, or 0 if there are none
                        />
                    ))}
                </div>
            </Card>
{/* Creates a batch card for each of the batches in the batches table that are not empty */} 
            <Card>
                <CardHeader>
                  <CardTitle>Current Batches</CardTitle>
                </CardHeader>
                    {batches.map(async (batch) => {
                    const product = await getProduct(batch.productID);
                    return (
                        <BatchesCard
                            key={batch.id}
                            name={product.name}
                            gyle={`G${formatNumber(batch.gyle)}`}
                            dateBrewed={batch.dateBrewed}
                            daysLeft={product.productionTime} //How long the given product takes to produce on average
                        />
                    );
                    })}
            </Card>
{/* Creates a product inventory card for each of the products in the products table */}  
            <Card>
            <CardHeader>
                <CardTitle>Customer Keg Stock</CardTitle>
            </CardHeader>
                <div className="grid grid-cols-1 gap-0">
                    {customers?.topCustomers.map((customer) => (
                        <CustomerCard
                            key={customer.id}
                            name={customer.name}
                            kegsOnHand={customer.kegsOnHand}
                        />
                    ))}
                </div>
            <CardFooter className="font-bold flex justify-between">
            <p>
                Total Kegs
            </p>
            <p>
                {customers?.totalKegs}
            </p>
            </CardFooter>
            </Card>
        </div>
    )
} 

type InventoryProps = {
    name: string
    kegInventory: string
    canInventory: string
}
//A card that shows a quick look at the current inventory for each of the products
function InventoryCard({name, kegInventory, canInventory}: 
    InventoryProps) {
        return (
            <CardContent className="grid gap-8">
                <div>
                    <div className="grid gap-1">
                        <p className="grid gap-1 text-xl font-semibold">
                            {name}
                        </p>
                        <div className="flex justify-between">
                            <p>
                                20L inventory
                            </p>
                            <p>
                                {kegInventory}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>
                                473ml inventory
                            </p>
                            <p>
                                {canInventory}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        )
}

type BatchesProps = {
    name: string
    gyle: string
    dateBrewed: Date
    daysLeft: number
}
//A card that shows a look at each of the batches currently in production
function BatchesCard({name, gyle, dateBrewed, daysLeft}:
    BatchesProps) {
        //Calculates how many days are left on the given batch based on it's production time, as well as when it was produced.
        const today = new Date();
        const timeDiff = today.getTime() - dateBrewed.getTime();
        const daysPassed = Math.floor(timeDiff / (1000*3600*24));
        const daysRemaining = daysLeft - daysPassed;
        return (
            <CardContent className="grid gap-8">
                <div>
                    <div className="grid gap-1">
                        <p className="grid gap-1 text-xl font-semibold">
                            {name}
                        </p>
                        <div className="flex justify-between">
                            <p>
                                Gyle Number
                            </p>
                            <p>
                                {gyle}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>
                                Days Remaining
                            </p>
                            <p>
                                {daysRemaining}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        )
}

type CustomerProps = {
    name: string
    kegsOnHand: number
}
//A card that shows the 10 customers with the most kegs on hand, their inventory, and then also gives the sum of all kegs on hand at all customers.
function CustomerCard({name, kegsOnHand}: 
    CustomerProps) {
        return (
            <div>
                <CardContent className="grid gap-8">
                    <div>
                        <div className="grid gap-1">
                            <p className="grid gap-1 text-xl font-semibold">
                                {name}
                            </p>
                            <div className="flex justify-between">
                                <p>
                                    20L inventory
                                </p>
                                <p>
                                    {kegsOnHand}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </div>
        )
}

