import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function adminBatchesPage() {
    return (
    <>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Batches</PageHeader>
            <Button asChild>
                <Link href="/admin/batches/new">+</Link>
            </Button>
        </div>
        <BatchesTable />
    </>
    )
}

function BatchesTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only"></span>
                    </TableHead>
                    <TableHead>Gyle</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Brew Date</TableHead>
                    <TableHead>Days Remaining</TableHead>
                    <TableHead>Volume Brewed</TableHead>
                    <TableHead>Volume Packaged</TableHead>
                    <TableHead>473ml Cans Packaged</TableHead>
                    <TableHead>20L Kegs Packaged</TableHead>
                    <TableHead>50L Kegs Packaged</TableHead>
                    <TableHead>60L Kegs Packaged</TableHead>
                    <TableHead>Tank Status</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    )
}