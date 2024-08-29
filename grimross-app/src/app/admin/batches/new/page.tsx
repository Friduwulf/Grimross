import prisma from "@/db/db";
import { PageHeader } from "../../_components/PageHeader";
import { BatchForm } from "../_components/BatchForm";
import React from "react";

//Get all of the rows in products table
async function getProductsData() {
    const data = await prisma.product.findMany();
 
    console.log(data)
    return data;
 }

export default async function NewBatchPage({ children }: { children: React.ReactNode }) {
    const products = await getProductsData();
    return(
        <>
            <PageHeader>Add Batch</PageHeader>
            <BatchForm products={products}/>
        </>
    )
}