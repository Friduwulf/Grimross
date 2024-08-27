import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/db/db";

async function getProductName(productID: string) {
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

async function getProductsData() {
   const data = await prisma.product.findMany()

   return data;
}

async function getBatchesData() {
    const data = await prisma.batch.findMany({
        where: {
            isEmpty: false
        },
    });

    return data;
}

export default async function AdminDashboard() {
    const products = await getProductsData()
    const batches = await getBatchesData()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
            <CardHeader>
                <CardTitle>Inventory Quick Look</CardTitle>
            </CardHeader>
                <div className="grid grid-cols-1 gap-0">
                    {products.map((product) => (
                        <InventoryCard
                            key={product.id}
                            name={product.name}
                            kegInventory={product.inventory_20L || 0}
                            canInventory={product.inventory_473ml || 0}
                        />
                    ))}
                </div>
            </Card>

            <Card>
                <CardHeader>
                  <CardTitle>Current Batches</CardTitle>
                </CardHeader>
                    {batches.map(async (batch) => {
                    const productName = await getProductName(batch.productID);

                    return (
                        <BatchesCard
                            key={batch.id}
                            name={productName.name}
                            gyle={batch.gyle}
                            dateBrewed={batch.dateBrewed}
                            daysLeft={productName.productionTime}
                        />
                    );
                    })}
            </Card>
        </div>
    )
} 


type InventoryProps = {
    name: string
    kegInventory: number
    canInventory: number
}

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
function BatchesCard({name, gyle, dateBrewed, daysLeft}:
    BatchesProps) {
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