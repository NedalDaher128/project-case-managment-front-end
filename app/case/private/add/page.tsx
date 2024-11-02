'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import {decodeToken} from '@/utils/case_token'
import Cookies from "js-cookie";
import {withAuthForLoggedInUsers} from '@/lib/withAuthForLoggedInUsers'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const Page = () => {
    const [caseNumber, setCaseNumber] = useState('');
    const [memberNumber, setMemberNumber] = useState('');
    const [accusation, setAccusation] = useState('');
    const [defendantQuestion, setDefendantQuestion] = useState('');
    const [officerQuestion, setOfficerQuestion] = useState('');
    const [victimQuestion, setVictimQuestion] = useState('');
    const [witnessQuestion, setWitnessQuestion] = useState('');
    const [technicalReports, setTechnicalReports] = useState('');
    const [caseReferral, setCaseReferral] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!process.env.NEXT_PUBLIC_API_URL) {
                throw new Error('API URL is not defined');
            }

            const token = Cookies.get('token');
            if (!token) {
                throw new Error('Token is not available');
            }
            const decodedToken = decodeToken(token);
            if (!decodedToken) {
                throw new Error('Invalid token');
            }
            const { id } = decodedToken;
            console.log(id);
            const req = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/private/cases/add`, {
                caseNumber,
                memberNumber,
                accusation,
                defendantQuestion,
                officerQuestion,
                victimQuestion,
                witnessQuestion,
                technicalReports,
                caseReferral,
                userId: id
                
            });

            // Clear data of inputs
            setCaseNumber('');
            setMemberNumber('');
            setAccusation('');
            setDefendantQuestion('');
            setOfficerQuestion('');
            setVictimQuestion('');
            setWitnessQuestion('');
            setTechnicalReports('');
            setCaseReferral('');
            
            if (req.data.success) {
                toast.success('تم إضافة القضية بنجاح');
            }else{
                toast.error('فشلت عملية إضافة القضية');
                console.log(req.data.error);
            }

        } catch (error) {
            toast.error('فشلت عملية إضافة القضية');
            if (axios.isAxiosError(error) && error.response) {
                console.log(error.response.data.message);
            } else {
                console.log('An unexpected error occurred');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case 'caseNumber':
                setCaseNumber(value);
                break;
            case 'memberNumber':
                setMemberNumber(value);
                break;
            case 'accusation':
                setAccusation(value);
                break;
            case 'defendantQuestion':
                setDefendantQuestion(value);
                break;
            case 'officerQuestion':
                setOfficerQuestion(value);
                break;
            case 'victimQuestion':
                setVictimQuestion(value);
                break;
            case 'witnessQuestion':
                setWitnessQuestion(value);
                break;
            case 'technicalReports':
                setTechnicalReports(value);
                break;
            case 'caseReferral':
                setCaseReferral(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex items-center justify-center h-[120vh]">
            <div className=" w-[427px] h-[660px] bg-[#1A1A1A] rounded-2xl flex items-center justify-center">
                <form onSubmit={handleSubmit} className="flex w-[348px] h-[433px] justify-center items-center content-center gap-x-[36px] gap-y-[40px] flex-shrink-0 flex-wrap">
                    <div dir="rtl" className="w-[156px]">
                        <label className=" text-white  text-sm" htmlFor="caseNumber">رقم القضية</label>
                        <Input type="text" value={caseNumber} onChange={handleChange} name="caseNumber" />
                    </div>
                    <div dir="rtl" className="w-[156px]">
                        <label className=" text-white text-sm" htmlFor="memberNumber">رقم العضو</label>
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
                    </div>
                    <div dir="rtl" className="w-[156px]">
                        <label className=" text-white text-sm" htmlFor="accusation">التهمة</label>
                        <Input type="text" value={accusation} onChange={handleChange} name="accusation" />
                    </div>
                    <div dir="rtl" className="w-[156px]">
                        <label className=" text-white text-sm" htmlFor="defendantQuestion">سؤال المتهم</label>
                        <Input type="text" value={defendantQuestion} onChange={handleChange} name="defendantQuestion" />
                    </div>
                    <div dir="rtl" className="w-[156px]">
                        <label className=" text-white text-sm" htmlFor="officerQuestion">سؤال الظابط</label>
                        <Input type="text" value={officerQuestion} onChange={handleChange} name="officerQuestion" />
                    </div>
                    <div dir="rtl" className="w-[156px]">
                        <label className=" text-white text-sm" htmlFor="victimQuestion">سؤال المجني عليه</label>
                        <Input type="text" value={victimQuestion} onChange={handleChange} name="victimQuestion" />
                    </div>
                    <div dir="rtl" className="w-[156px]">
                        <label className=" text-white text-sm" htmlFor="witnessQuestion">سؤال الشهود</label>
                        <Input type="text" value={witnessQuestion} onChange={handleChange} name="witnessQuestion" />
                    </div>
                    <div dir="rtl" className="w-[156px]">
                        <label className=" text-white text-sm" htmlFor="technicalReports">تقارير فنية</label>
                        <Input type="text" value={technicalReports} onChange={handleChange} name="technicalReports" />
                    </div>
                    <div dir="rtl" className="w-[156px]">
                        <label className=" text-white text-sm" htmlFor="caseReferral">حالة القضية</label>
                        <Input type="text" value={caseReferral} onChange={handleChange} name="caseReferral" />
                    </div>
                    <Button type="submit" className="w-[252px] bg-[#45369f] hover:bg-[#5643bd]">
                        إضافة
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default withAuthForLoggedInUsers(Page);
