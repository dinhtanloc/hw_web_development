import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useAxios from '../../client/utils/useAxios'

const downloadExcel = async () => {
    const download = useAxios()
    try {
        const response = await download.get('http://localhost:8000/api/data/');
        const data = response.data;
        
        const orders = data.orders;

        // Tạo worksheet từ dữ liệu
        const ordersWS = XLSX.utils.json_to_sheet(orders);

        // Tạo workbook và thêm các worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ordersWS, 'Orders');

        // Xuất workbook ra file Excel
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'orders_products.xlsx');
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
};

export default downloadExcel