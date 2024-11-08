'use client';
import { useState, useMemo, useEffect } from "react";
import Cookies from 'js-cookie';
import {
    Table,
    TableBody,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import axios from "axios";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef
} from '@tanstack/react-table';
import DialogEditCase from "@/components/case_management/dialogEditCasePrivate";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { decodeToken } from '@/utils/case_token'
import { Button } from "@/components/ui/button";
import {withAuthForLoggedInUsers} from '@/lib/withAuthForLoggedInUsers'

const Page = () => {
    interface Case {
        id: string;
        caseNumber: string;
        memberNumber: string;
        accusation: string;
        defendantQuestion: string;
        officerQuestion: string;
        victimQuestion: string;
        witnessQuestion: string;
        technicalReports: string;
        caseReferral: string;
        isReadyForDecision: boolean;
    }

    const [data, setData] = useState<Case[]>([]);
    const [filteredData, setFilteredData] = useState<Case[]>([]);
    const [pageSize, setPageSize] = useState(10);
    const [memberNumber, setMemberNumber] = useState<string>('');
    const [isReadyForDecision, setIsReadyForDecision] = useState<string>('');

    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/private/cases`);
            const cases = response.data.cases || [];
    
            const updatedCases = cases.map((caseData: Case) => ({
                ...caseData,
                isReadyForDecision: !!(caseData.defendantQuestion &&
                    caseData.officerQuestion &&
                    caseData.victimQuestion &&
                    caseData.witnessQuestion &&
                    caseData.technicalReports &&
                    caseData.caseReferral) // تعيين كـ boolean
            }));
    
            setData(updatedCases);
            setFilteredData(updatedCases);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const clearFilters = () => {
        setMemberNumber('');
        setIsReadyForDecision('');
    }
    const getDataByUser = async (user: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/private/cases/${user}`);
            const cases = response.data.cases || [];

            const updatedCases = cases.map((caseData: Case) => ({
                ...caseData,
                isReadyForDecision: !!(caseData.defendantQuestion &&
                    caseData.officerQuestion &&
                    caseData.victimQuestion &&
                    caseData.witnessQuestion &&
                    caseData.technicalReports &&
                    caseData.caseReferral) // تعيين كـ boolean
            }));

            setData(updatedCases);
            setFilteredData(updatedCases);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        const cookie = Cookies.get('token');
        if (cookie) {
            const decodedToken = decodeToken(cookie);
            const role = decodedToken ? decodedToken.role : null;
            const id = decodedToken ? decodedToken.id : null;
            if (role === 'admin') {
                getData();
            } else if (role === 'editor') {
                getDataByUser(id);
            } else {
                throw new Error('Unauthorized');
            }
        } else {
            throw new Error('Token not found');
        }
    }, []);

    useEffect(() => {
        const filterData = () => {
            const filtered = data.filter(item => {
                const memberNumberMatch = memberNumber ? item.memberNumber === memberNumber : true;
                const isReadyForDecisionMatch = isReadyForDecision ? item.isReadyForDecision === (isReadyForDecision === 'نعم') : true;
    
                return memberNumberMatch && isReadyForDecisionMatch;
            });
            setFilteredData(filtered);
        };
    
        filterData();
    }, [memberNumber, isReadyForDecision, data]);
    

    const columns = useMemo<ColumnDef<Case>[]>(() => [
        { accessorKey: 'caseNumber', header: 'رقم القضية' },
        { accessorKey: 'memberNumber', header: 'رقم العضو' },
        { accessorKey: 'accusation', header: 'التهمة' },
        { accessorKey: 'defendantQuestion', header: 'سؤال المتهم' },
        { accessorKey: 'officerQuestion', header: 'سؤال الضابط' },
        { accessorKey: 'victimQuestion', header: 'سؤال المجني عليه' },
        { accessorKey: 'witnessQuestion', header: 'سؤال الشهود' },
        { accessorKey: 'technicalReports', header: 'التقارير الفنية' },
        { accessorKey: 'caseReferral', header: ' جاهزة للتصرف' },
        { accessorKey: 'isReadyForDecision', header: 'جاهزة للقرار', cell: (info) => info.getValue() ? 'نعم' : 'لا' },
        {
            header: 'تعديل',
            cell: (info) => {
                return (
                    <div className="flex justify-center items-center w-[50px]">
                        <DialogEditCase caseID={Number(info.row.original.id)}>
                            <Image src={'/edit.svg'} width={24} height={24} alt="" />
                        </DialogEditCase>
                    </div>
                )
            }
        }
    ], []);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            pagination: { pageIndex: 0, pageSize },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleNextPage = () => table.nextPage();
    const handlePreviousPage = () => table.previousPage();

    return (
        <div className="flex flex-col items-center h-[110vh] space-y-4">

            <div dir='rtl' className="w-[1210px] ">
                {/* Filter Section */}
                <div className="flex items-center self-end space-x-4 mb-4 gap-5">
                    <Select dir="rtl" value={memberNumber} onValueChange={(value) => setMemberNumber(value)}>
                        <SelectTrigger className="w-[156px]">
                            <SelectValue placeholder="رقم العضو" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="9">9</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select dir="rtl" value={isReadyForDecision} onValueChange={(value) => setIsReadyForDecision(value)}>
                        <SelectTrigger className="w-[156px]">
                            <SelectValue placeholder=" جاهزة للتصرف" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="نعم">نعم</SelectItem>
                            <SelectItem value="لا">لا</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="bg-purple-700 hover:bg-purple-500" onClick={clearFilters}>مسح الفلاتر</Button>
                </div>
                <Table className=" overflow-hidden">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter></TableFooter>
                </Table>
            </div>

            <div className="flex space-x-2">
                <button onClick={handlePreviousPage} disabled={!table.getCanPreviousPage()} className="border rounded p-2">
                    السابق
                </button>
                {table.getPageOptions().map((pageIndex) => (
                    <button
                        key={pageIndex}
                        onClick={() => table.setPageIndex(pageIndex)}
                        className={`border rounded p-2 ${table.getState().pagination.pageIndex === pageIndex ? 'bg-purple-500 text-white' : ''}`}
                    >
                        {pageIndex + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={!table.getCanNextPage()} className="border rounded p-2">
                    التالي
                </button>
            </div>
        </div>
    );
};

export default withAuthForLoggedInUsers(Page);
