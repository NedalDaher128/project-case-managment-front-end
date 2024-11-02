'use client';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogEditCaseProps } from "@/types/DialogEditCase";
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface UpdatedCaseFields {
    id: string;
    caseNumber?: string;
    memberNumber?: string;
    accusation?: string;
    defendantQuestion?: string;
    officerQuestion?: string;
    victimQuestion?: string;
    witnessQuestion?: string;
    technicalReports?: string;
    caseReferral?: string;
    isReadyForDecision?: boolean;
}

const ModalEditCase = ({ children, caseID }: DialogEditCaseProps) => {
    const [caseNumber, setCaseNumber] = useState('');
    const [memberNumber, setMemberNumber] = useState('');
    const [accusation, setAccusation] = useState('');
    const [defendantQuestion, setDefendantQuestion] = useState('');
    const [officerQuestion, setOfficerQuestion] = useState('');
    const [victimQuestion, setVictimQuestion] = useState('');
    const [witnessQuestion, setWitnessQuestion] = useState('');
    const [technicalReports, setTechnicalReports] = useState('');
    const [caseReferral, setCaseReferral] = useState('');
    const [isReadyForDecision, setIsReadyForDecision] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedFields: UpdatedCaseFields = { id: caseID.toString() };

        if (caseNumber) updatedFields.caseNumber = caseNumber;
        if (memberNumber) updatedFields.memberNumber = memberNumber;
        if (accusation) updatedFields.accusation = accusation;
        if (defendantQuestion) updatedFields.defendantQuestion = defendantQuestion;
        if (officerQuestion) updatedFields.officerQuestion = officerQuestion;
        if (victimQuestion) updatedFields.victimQuestion = victimQuestion;
        if (witnessQuestion) updatedFields.witnessQuestion = witnessQuestion;
        if (technicalReports) updatedFields.technicalReports = technicalReports;
        if (caseReferral) updatedFields.caseReferral = caseReferral;
        updatedFields.isReadyForDecision = isReadyForDecision;

        if (Object.keys(updatedFields).length > 1) {
            try {
                if (!process.env.NEXT_PUBLIC_API_URL) {
                    throw new Error('API URL is not defined');
                }
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/private/cases/edit`, updatedFields);
                toast.success('تم التحديث بنجاح!');
            } catch (error) {
                toast.error('فشلت عملية التحديث');
                console.error(error);
            }
        } else {
            toast.error('يرجى ملء حقل واحد على الأقل للتحديث');
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
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent dir="rtl" className="bg-[#1B2431]  text-white border-none">
                <DialogHeader>
                    <DialogTitle>تعديل القضية</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col space-y-5 space-x-4">
                            <label htmlFor="caseNumber">رقم القضية</label>
                            <Input name="caseNumber" onChange={handleChange} type="text" min="1" placeholder="رقم القضية" className="bg-[#283444] text-white w-full" />
                        </div>
                        <div className="flex flex-col space-y-5 space-x-4">
                            <label htmlFor="memberNumber">رقم العضو</label>
                            <Select dir="rtl" onValueChange={(value) => setMemberNumber(value)}>
                                <SelectTrigger className="w-[175px] bg-[#283444] text-gray-500  border-white  ">
                                    <SelectValue placeholder="رقم العضو" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1B2431]  text-white border-none">
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
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col space-y-5 space-x-4">
                            <label htmlFor="accusation">التهمة</label>
                            <Input name="accusation" onChange={handleChange} type="text" placeholder="التهمة" className="bg-[#273142] text-white w-full" />
                        </div>
                        <div className="flex flex-col space-y-5 space-x-4">
                            <label htmlFor="defendantQuestion">سؤال المتهم</label>
                            <Input name="defendantQuestion" onChange={handleChange} type="text" placeholder="سؤال المتهم" className="bg-[#273142] text-white w-full" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col space-y-5 space-x-4">
                            <label htmlFor="officerQuestion">سؤال الضابط</label>
                            <Input name="officerQuestion" onChange={handleChange} type="text" placeholder="سؤال الضابط" className="bg-[#273142] text-white w-full" />
                        </div>
                        <div className="flex flex-col space-y-5 space-x-4">
                            <label htmlFor="victimQuestion">سؤال المجني عليه</label>
                            <Input name="victimQuestion" onChange={handleChange} type="text" placeholder="سؤال المجني عليه" className="bg-[#273142] text-white w-full" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col space-y-5 space-x-4">
                            <label htmlFor="witnessQuestion">سؤال الشهود</label>
                            <Input name="witnessQuestion" onChange={handleChange} type="text" placeholder="سؤال الشهود" className="bg-[#273142] text-white w-full" />
                        </div>
                        <div className="flex flex-col space-y-5 space-x-4">
                            <label htmlFor="technicalReports">التقارير الفنية</label>
                            <Input name="technicalReports" onChange={handleChange} type="text" placeholder="التقارير الفنية" className="bg-[#273142] text-white w-full" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5 space-x-4">
                        <label htmlFor="caseReferral">حالة القضية</label>
                        <Input name="caseReferral" onChange={handleChange} type="text" placeholder="حالة القضية" className="bg-[#273142] text-white w-full" />
                    </div>
                    <Button type="submit" variant="default" className="bg-[#4741DE] hover:bg-[#6A68FF] self-center min-w-56">حفظ التعديلات</Button>
                </form>
                <DialogFooter className="mt-4"></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditCase;
