import { removeVietnameseTones } from './removeVietnamese';

export function checkSearch(value) {
    const Respiratory = ['ho', 'mui', 'hong', 'hat xi', 'ho hap', 'phoi', 'hen suyen', 'lao'];
    const HeartRespi = ['tuc nguc', 'kho tho', 'nguc'];
    const Heart = ['tim', 'huyet ap'];
    const Eye = ['mat', 'vong mac'];
    const Diabetes = ['tieu duong', 'duong huyet'];
    const Allergy = ['di ung'];
    const Dental = ['rang', 'mieng', 'nuou']; 
    if(Respiratory.some(obj => obj.indexOf(removeVietnameseTones(value).toLowerCase()) !== -1)) return 4;
    else if(HeartRespi.some(obj => obj.indexOf(removeVietnameseTones(value).toLowerCase()) !== -1)) return 3;
    else if(Heart.some(obj => obj.indexOf(removeVietnameseTones(value).toLowerCase()) !== -1)) return 3;
    else if(Eye.some(obj => obj.indexOf(removeVietnameseTones(value).toLowerCase()) !== -1)) return 1;
    else if(Diabetes.some(obj => obj.indexOf(removeVietnameseTones(value).toLowerCase()) !== -1)) return 2;
    else if(Allergy.some(obj => obj.indexOf(removeVietnameseTones(value).toLowerCase()) !== -1)) return 5;
    else if(Dental.some(obj => obj.indexOf(removeVietnameseTones(value).toLowerCase()) !== -1)) return 6;
    else return 0;
}