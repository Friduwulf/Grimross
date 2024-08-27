import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";

async function getProductsData() {
    const productCount = await db.Product.aggregate({
        _count:true
    })

    return {
        amount: productCount._count
    }
}

export default async function AdminDashboard() {
    const numProducts = await getProductsData()
    return (
        <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            <DashboardCard
                title= "Inventory"
                subtitle= "A quick look at the current product inventory."
                body= {numProducts.amount}
            />
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
        </div>
    )
} 

function DashboardCard({title, subtitle, body}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {subtitle}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {body}
            </CardContent>
        </Card>
    )
}