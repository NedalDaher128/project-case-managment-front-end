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
} from "@/components/ui/select"
// تعريف نوع UpdatedCaseFields
interface UpdatedCaseFields {
  id: string;
  caseNumber?: string;
  defendantName?: string;
  startDate?: string;
  imprisonmentDuration?: string;
  member_location?: string;
  member_number?: string;
  type_case?: string;

}

const ModalEditCase = ({ children, caseID }: DialogEditCaseProps) => {
  const [caseNumber, setCaseNumber] = useState('');
  const [accusedName, setAccusedName] = useState('');
  const [caseDate, setCaseDate] = useState('');
  const [casePrisonDate, setCasePrisonDate] = useState('');
  const [memberLocation, setMemberLocation] = useState('');
  const [memberNumber, setMemberNumber] = useState('');
  const [caseType, setcaseType] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFields: UpdatedCaseFields = { id: caseID.toString() }; // استخدام النوع المخصص

    if (caseNumber) updatedFields.caseNumber = caseNumber;
    if (accusedName) updatedFields.defendantName = accusedName;
    if (caseDate) updatedFields.startDate = caseDate;
    if (casePrisonDate) updatedFields.imprisonmentDuration = casePrisonDate;
    if (memberLocation) updatedFields.member_location = memberLocation;
    if (memberNumber) updatedFields.member_number = memberNumber;
    if (caseType) updatedFields.type_case = caseType;

    if (Object.keys(updatedFields).length > 1) { // Check if at least one field is filled
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error('API URL is not defined');
        }
        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/public/cases/edit`, updatedFields);
        toast.success('تم التحديث بنجاح!');
      } catch (error) {
        toast.error('فشلت عملية التحديث');
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.data.message);
        } else {
          console.log('An unexpected error occurred');
        }
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
      case 'accusedName':
        setAccusedName(value);
        break;
      case 'caseDate':
        setCaseDate(value);
        break;
      case 'casePrisonDate':
        setCasePrisonDate(value);
        break;
      case 'memberLocation':
        setMemberLocation(value);
        break;
      case 'memberNumber':
        setMemberNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent dir="rtl" className="bg-[#1B2431] text-white border-none">
        <DialogHeader>
          <DialogTitle>تعديل القضية</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center">
          <div className="flex flex-col space-y-5 space-x-4">
            <label htmlFor="caseNumber">رقم القضية</label>
            <Input name="caseNumber" onChange={handleChange} type="text" min="1" placeholder="رقم القضية" className="bg-[#273142] text-white w-full" />
          </div>
          <div className="flex flex-col space-y-5 space-x-4">
            <label htmlFor="accusedName">اسم المتهم</label>
            <Input name="accusedName" onChange={handleChange} type="text" placeholder="اسم المتهم" className="bg-[#273142] text-white w-full" />
          </div>
          <div className="flex flex-col space-y-5 space-x-4">
            <label htmlFor="caseDate">مدة البداية</label>
            <Input name="caseDate" onChange={handleChange} type="date" placeholder="بداية الحبس" className="bg-[#273142] text-white w-full" />
          </div>
          <div className="flex flex-col space-y-5 space-x-4">
            <label htmlFor="casePrisonDate">مدة الحبس</label>
            <Input name="casePrisonDate" onChange={handleChange} type="number" min="1" placeholder="مدة الحبس" className="bg-[#273142] text-white w-full" />
          </div>
          <div dir="rtl"  className="flex flex-col space-y-5 space-x-4">
            <label className=" text-white text-sm" htmlFor="caseRenewalDate">مكان العضو</label>
            <Select onValueChange={(value) => setMemberNumber(value)}>
              <SelectTrigger  className="bg-[#273142] text-white w-full" >
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
          <div dir="rtl"  className="flex flex-col space-y-5 space-x-4">
            <label className=" text-white text-sm" htmlFor="caseRenewalDate">مكان التجديد</label>
            <Select   onValueChange={(value) => setMemberLocation(value)}>
              <SelectTrigger  className="bg-[#273142] text-white w-full">
                <SelectValue placeholder="مكان التجديد" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="جزئي">جزئي</SelectItem>
                <SelectItem value="مستأنف">مستأنف</SelectItem>
                <SelectItem value="جنايات">جنايات</SelectItem>
                <SelectItem value="رئيس نيابة">رئيس نيابة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div dir="rtl" className="flex flex-col space-y-5 space-x-4">
                        <label className=" text-white text-sm" htmlFor="caseRenewalDate">نوع القضية</label>
                        <Select dir="rtl" value={caseType} onValueChange={(value) => setcaseType(value)}>
                            <SelectTrigger className="bg-[#273142] text-white w-full">
                                <SelectValue placeholder="نوع القضية" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="جنحة ">جنحة </SelectItem>
                            <SelectItem value="جناية  ">جناية  </SelectItem>
                            <SelectItem value="اداري ">اداري </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
          <Button type="submit" variant="default" className="bg-[#4741DE] hover:bg-[#6A68FF] self-center min-w-56">حفظ التعديلات</Button>
        </form>
        <DialogFooter className="mt-4"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditCase;
