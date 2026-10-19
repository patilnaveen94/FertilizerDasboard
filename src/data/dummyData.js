export const districts = ['Bangalore Urban', 'Mysore', 'Belgaum', 'Dharwad', 'Hubli'];
export const taluks = ['Anekal', 'Bangalore North', 'Bangalore South', 'Devanahalli'];
export const rsks = ['RSK-001', 'RSK-002', 'RSK-003', 'RSK-004'];
export const fertilizerItems = ['Urea', 'DAP', 'MOP', 'NPK 10-26-26', 'SSP', 'Zinc Sulphate', 'Ammonium Sulphate'];

export const summaryCards = [
  { title: 'Total Retailers', value: '1,248', icon: 'Store', color: '#1565c0', trend: 8 },
  { title: 'Total Stock', value: '45,230 MT', icon: 'Inventory', color: '#43a047', trend: 12 },
  { title: 'Low Stock Alerts', value: 37, icon: 'Warning', color: '#e53935', trend: -5 },
  { title: 'Total Items', value: 156, icon: 'Category', color: '#fb8c00', trend: 3 },
];

export const topSellingData = [
  { name: 'Urea', sales: 4200 },
  { name: 'DAP', sales: 3800 },
  { name: 'MOP', sales: 2900 },
  { name: 'NPK', sales: 2400 },
  { name: 'SSP', sales: 1800 },
];

export const leastSellingData = [
  { name: 'Zinc Sulphate', value: 320 },
  { name: 'Ammonium Sulphate', value: 280 },
  { name: 'Boron', value: 150 },
  { name: 'Gypsum', value: 90 },
];

export const posVsPhysicalData = [
  { name: 'Urea', pos: 1200, physical: 1150 },
  { name: 'DAP', pos: 980, physical: 1020 },
  { name: 'MOP', pos: 750, physical: 740 },
  { name: 'NPK', pos: 620, physical: 580 },
  { name: 'SSP', pos: 430, physical: 450 },
];

export const retailerStockData = [
  { id: 1, retailer: 'Krishi Seva Kendra', item: 'Urea', pos: 120, physical: 115, difference: 5 },
  { id: 2, retailer: 'Farmers Hub', item: 'DAP', pos: 80, physical: 80, difference: 0 },
  { id: 3, retailer: 'Agro Traders', item: 'MOP', pos: 60, physical: 45, difference: 15 },
  { id: 4, retailer: 'Green Fields', item: 'NPK 10-26-26', pos: 95, physical: 90, difference: 5 },
  { id: 5, retailer: 'Bharat Fertilizers', item: 'SSP', pos: 200, physical: 180, difference: 20 },
  { id: 6, retailer: 'Kisan Agro', item: 'Urea', pos: 150, physical: 150, difference: 0 },
  { id: 7, retailer: 'Shree Traders', item: 'Zinc Sulphate', pos: 30, physical: 25, difference: 5 },
  { id: 8, retailer: 'Nandi Agro', item: 'DAP', pos: 110, physical: 100, difference: 10 },
];

export const retailerEntries = [
  { id: 1, item: 'Urea', pos: 120, physical: 115, date: '2024-01-15' },
  { id: 2, item: 'DAP', pos: 80, physical: 80, date: '2024-01-14' },
  { id: 3, item: 'MOP', pos: 60, physical: 45, date: '2024-01-13' },
  { id: 4, item: 'NPK 10-26-26', pos: 95, physical: 90, date: '2024-01-12' },
];

export const reportData = [
  { id: 1, retailer: 'Krishi Seva Kendra', district: 'Bangalore Urban', taluk: 'Anekal', item: 'Urea', pos: 120, physical: 115, sales: 450, date: '2024-01-15' },
  { id: 2, retailer: 'Farmers Hub', district: 'Mysore', taluk: 'Bangalore North', item: 'DAP', pos: 80, physical: 80, sales: 320, date: '2024-01-14' },
  { id: 3, retailer: 'Agro Traders', district: 'Belgaum', taluk: 'Bangalore South', item: 'MOP', pos: 60, physical: 45, sales: 210, date: '2024-01-13' },
  { id: 4, retailer: 'Green Fields', district: 'Dharwad', taluk: 'Devanahalli', item: 'NPK', pos: 95, physical: 90, sales: 380, date: '2024-01-12' },
  { id: 5, retailer: 'Bharat Fertilizers', district: 'Bangalore Urban', taluk: 'Anekal', item: 'SSP', pos: 200, physical: 180, sales: 520, date: '2024-01-11' },
  { id: 6, retailer: 'Kisan Agro', district: 'Hubli', taluk: 'Bangalore North', item: 'Urea', pos: 150, physical: 150, sales: 600, date: '2024-01-10' },
];
