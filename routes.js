const express = require('express');
const router = express.Router();




const roomController = require('./gestion-hotel-backend/controllers/roomController.js');
const clientController = require('./gestion-hotel-backend/controllers/clientController.js');
const authMiddleware = require('./gestion-hotel-backend/middleware/authMiddleware.js');
const reservationController = require('./gestion-hotel-backend/controllers/reservationController.js');
const employeeController = require('./gestion-hotel-backend/controllers/employeeController.js');
const serviceController = require('./gestion-hotel-backend/controllers/serviceController.js');
const supplierController = require('./gestion-hotel-backend/controllers/supplierController.js');
const stockController = require('./gestion-hotel-backend/controllers/stockController.js');
const invoiceController = require('./gestion-hotel-backend/controllers/invoiceController.js');

// router.use(authMiddleware.authenticateToken);
router.get('/rooms', roomController.getAllRooms);
router.get('/rooms/:id', roomController.getRoomById);
router.post('/rooms', roomController.createRoom);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', roomController.deleteRoom);

router.get('/clients', clientController.getAllClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);

router.get('/reservations', reservationController.getAllReservations);
router.get('/reservations/:id', reservationController.getReservationById);
router.post('/reservations', reservationController.createReservation);
router.put('/reservations/:id', reservationController.updateReservation);
router.delete('/reservations/:id', reservationController.deleteReservation);

router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees', employeeController.createEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.post('/services', serviceController.createService);
router.put('/services/:id', serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);

router.get('/suppliers', supplierController.getAllSuppliers);
router.get('/suppliers/:id', supplierController.getSupplierById);
router.post('/suppliers', supplierController.createSupplier);
router.put('/suppliers/:id', supplierController.updateSupplier);
router.delete('/suppliers/:id', supplierController.deleteSupplier);

router.get('/stocks', stockController.getAllStocks);
router.get('/stocks/:id', stockController.getStockById);
router.post('/stocks', stockController.createStock);
router.put('/stocks/:id', stockController.updateStock);
router.delete('/stocks/:id', stockController.deleteStock);

router.get('/invoices', invoiceController.getAllInvoices);
router.get('/invoices/:id', invoiceController.getInvoiceById);
router.post('/invoices', invoiceController.createInvoice);
router.put('/invoices/:id', invoiceController.updateInvoice);
router.delete('/invoices/:id', invoiceController.deleteInvoice);

module.exports = router;
