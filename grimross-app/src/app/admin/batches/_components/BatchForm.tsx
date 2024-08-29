"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";

type Product = {
    id: string;
    name: string;
    productionTime: number;
    inventory_20L: number;
    inventory_473ml: number;
    available_20L: boolean;
    available_473ml: boolean;
}

interface BatchFormProps {
    products: Product[];
  }

export function BatchForm({ products }: BatchFormProps) {
    const [date, setDate] = React.useState<Date>()
    const [volume, setVolume] = React.useState('');
    const handleInputChange = (event: any) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
        setVolume(numericValue);
      };
    return (
        <form className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="gyle">
                    Gyle
                </Label>
                <Input type="number" id="gyle" name="gyle" required className="w-40"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="product">
                    Product
                </Label>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Product" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Products</SelectLabel> 
                            {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                                {product.name}
                            </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="date Brewed" className="mb-2">
                    Date Brewed
                </Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-2">
                <Label htmlFor="volume brewed">
                    Volume Brewed
                </Label>
                <Input type="text" id="volume brewed" name="volume brewed" value={volume + 'L'} required onChange={handleInputChange} className="w-40"/>
            </div>
        </form>
    )
}