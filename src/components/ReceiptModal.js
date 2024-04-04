// ReceiptModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const ReceiptModal = ({
  show,
  handleClose,
  handleSave,
  selectedReceipt,
  receiptData,
  handleDateChange,
  handleChange,
  setReceiptData,
  itemList
}) => {

    console.log("iteml1233",itemList)
  // const [totalAmount, setTotalAmount] = useState(0);
  // const [netAmount, setNetAmount] = useState(0);
  // const [items, setItems] = useState(receipt ? receipt.billItems : []);

  // useEffect(() => {
  //     if (receipt && receipt.totalDiscountAmount !== undefined) {
  //         const calculateTotalAmount = () => {
  //             const total = items.reduce((total, row) => total + row.amount, 0);
  //             setTotalAmount(total);
  //             setNetAmount(total - parseFloat(receipt.totalDiscountAmount));
  //         };
  //         calculateTotalAmount();
  //     }
  // }, [receipt, items]);

  const handleRowChange = (index, field, value) => {
    // const updatedItems = [...items];
    // updatedItems[index][field] = value;
    // setItems(updatedItems);
  };

  const formattedItemOptions = itemList.map(item => ({
    label: item.ItemName,
    value: item.ItemID
}));

console.log("formateditem",formattedItemOptions)

  
  const dataDetail=  selectedReceipt?.ReceiptDetail.map((item) => {
    console.log("item",item.Rate)
      return {
        receiptDetailID: item.ReceiptDetailID,
        receiptID: item.ReceiptID,
        itemID: item.ItemID,
        quantity: item.Quantity,
        rate: item.Rate,
        discount: item.Discount,
        amount: item.Amount,
        itemName: "",
        unit: "",
        grossAmount: 0,
        discountPercent: 0,
      };
    })
  
  useEffect(() => {
    console.log("object",selectedReceipt)
    if (selectedReceipt) {
      setReceiptData({
        ...receiptData,
        receiptNo: selectedReceipt.ReceiptNo,
        personName: "",
        receiptDate: selectedReceipt.ReceiptDate,
        doctorID: selectedReceipt.DoctorID,
        netAmount: selectedReceipt.NetAmount,
        remarks: selectedReceipt.Remarks,
        receiptDetail:dataDetail
      });
    }
    console.log("received",receiptData.receiptDetail)

    // console.log("cahnge",receiptData)
  }, [selectedReceipt]);

  const handleAddRow = () => {
    setReceiptData((prevState) => ({
      ...prevState,
      receiptDetail: [
        ...prevState.receiptDetail,
        {
          receiptDetailID: 0,
          receiptID: 0,
          itemID: 0,
          quantity: 0,
          rate: 0,
          discount: 0,
          amount: 0,
          itemName: "",
          unit: "",
          grossAmount: null,
          discountPercent: null,
        },
      ],
    }));
  };

  // Calculate gross amount
  const calculateGrossAmount = (item) => {
    return item.quantity * item.rate;
  };

  // Calculate discount amount
  const calculateDiscountAmount = (item) => {
    console.log("calculated value",item)
    return (item.quantity * item.rate * item.discountPercent) / 100;
  };

  // Calculate total amount
  const calculateAmount = (item) => {
    // console.log("item0",item)
    const grossAmount = calculateGrossAmount(item);
    const discountAmount = calculateDiscountAmount(item);
    const amnt = grossAmount - discountAmount;
    item["amount"] = amnt;
    return grossAmount - discountAmount;
  };
  const totalAmount = receiptData.receiptDetail.reduce(
    (total, detail) => total + detail.amount,
    0
  );
  useEffect(() => {
    setReceiptData({
      ...receiptData,
      netAmount: totalAmount,
    });
  }, [totalAmount]);

  const totalQuantity = receiptData.receiptDetail.reduce(
    (total, detail) => total + parseInt(detail.quantity),
    0
  );

  const handleItemChange = (selectedItem, index,item) => {
    console.log("selectedItem",selectedItem,index,item);
    const updatedItems = [...receiptData.receiptDetail];
    updatedItems[index].itemID = selectedItem.value; 
    setReceiptData({
      ...receiptData,
      receiptDetail: updatedItems,
    });
    item["itemID"] = selectedItem.value;
  };

  // const calculateNetAmount = (receiptData) => {
  //     const totalAmount = receiptData.receiptDetail.reduce((total, detail) => total + detail.amount, 0);
  //     setReceiptData(prevState => ({
  //       ...prevState,
  //       netAmount: totalAmount
  //     }));
  //     return totalAmount;
  //   };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="receiptNo">
            <Form.Label>Receipt No</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={receiptData.receiptNo}
              name="receiptNo"
            />
          </Form.Group>
          <Form.Group controlId="formReceiptDate">
            <Form.Label>Receipt Date</Form.Label>
            <DatePicker
              selected={receiptData.receiptDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
            />
          </Form.Group>
          <Form.Group controlId="personName">
            <Form.Label>Person Name</Form.Label>
            <Form.Control
              type="text"
              value={receiptData.personName}
              onChange={handleChange}
              name="personName"
            />
          </Form.Group>
          <Form.Group controlId="formItems" className="">
            <Form.Label>Items</Form.Label>
            {receiptData.receiptDetail.map((item, index) => (
              <div key={index}>
                {console.log("12344",item)}

                <Col>
                  {/* <Form.Control
                    type="text"
                    placeholder="Item Name"
                    value={item.itemName}
                    onChange={(e) => {
                      const updatedItems = [...receiptData.receiptDetail];
                      updatedItems[index].itemName = e.target.value;
                      setReceiptData({
                        ...receiptData,
                        receiptDetail: updatedItems,
                      });
                    }}
                    name="itemName"
                  /> */}
                   <Form.Group controlId="itemName">
                            <Select
                                options={formattedItemOptions}
                                value={
                                    formattedItemOptions &&
                                    formattedItemOptions.find(
                                        option => option.value === (item.itemID)
                                    )
                                }
                                onChange={(selectedItem) => handleItemChange(selectedItem, index,item)}
                            />
                        </Form.Group>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Unit"
                    value={item.unit}
                    onChange={(e) => {
                      const updatedItems = [...receiptData.receiptDetail];
                      updatedItems[index].unit = e.target.value;
                      setReceiptData({
                        ...receiptData,
                        receiptDetail: updatedItems,
                      });
                    }}
                    name="unit"
                  />
                </Col>
                <Col>
                {console.log("adfgh",receiptData.receiptDetail[0].rate)}
                  <Form.Control
                    type="text"
                    placeholder="rate"
                    value={item.rate}
                    onChange={(e) => {
                      const updatedItems = [...receiptData.receiptDetail];
                      updatedItems[index].rate = e.target.value;
                      setReceiptData({
                        ...receiptData,
                        receiptDetail: updatedItems,
                      });
                    }}
                    name="rate"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="quantity"
                    value={item.quantity}
                    onChange={(e) => {
                      const updatedItems = [...receiptData.receiptDetail];
                      updatedItems[index].quantity = e.target.value;
                      setReceiptData({
                        ...receiptData,
                        receiptDetail: updatedItems,
                      });
                    }}
                    name="quantity"
                  />
                </Col>
                <Col>
                  {/* <Form.Control
                                        type="text"
                                        placeholder="Gross Amount"
                                        value={receiptData.receiptDetail.grossAmount}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].grossAmount = e.target.value; 
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems }); 
                                        }}
                                        name='grossAmount'
                                    /> */}
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Gross Amount"
                      value={calculateGrossAmount(item)}
                      disabled
                      name="grossAmount"
                    />
                  </Col>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Discount %"
                    value={item.discountPercent}
                    onChange={(e) => {
                      const updatedItems = [...receiptData.receiptDetail];
                      updatedItems[index].discountPercent = e.target.value;
                      setReceiptData({
                        ...receiptData,
                        receiptDetail: updatedItems,
                      });
                    }}
                    name="discountPercent"
                  />
                </Col>
                <Col>
                  {/* <Form.Control
                                        type="text"
                                        placeholder="Discount Amount"
                                        value={receiptData.receiptDetail.discount}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].discount = e.target.value;
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems });
                                        }}
                                        name='discount'
                                    /> */}
                  <Form.Control
                    type="number"
                    placeholder="Discount Amount"
                    value={calculateDiscountAmount(item)}
                    disabled
                    name="discount"
                  />
                </Col>
                <Col>
                  {/* <Form.Control
                                        type="text"
                                        placeholder="Amount"
                                        value={receiptData.receiptDetail.amount}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].amount = e.target.value;
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems });
                                        }}
                                        name='amount'
                                    /> */}
                  <Form.Control
                    type="number"
                    placeholder="Amount"
                    value={calculateAmount(item)}
                    disabled
                    name="amount"
                  />
                </Col>
              </div>
            ))}
            <Button variant="primary" onClick={handleAddRow}>
              Add Item
            </Button>
          </Form.Group>
          <Form.Group controlId="formTotalQty">
            <Form.Label>Total Qty</Form.Label>
            <Form.Control type="number" value={totalQuantity} />
          </Form.Group>
          <Form.Group controlId="formNetAmount">
            <Form.Label>Net Amount</Form.Label>
            <Form.Control
              type="number"
              value={receiptData.netAmount}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="remarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              type="text"
              value={receiptData.remarks}
              onChange={handleChange}
              name="remarks"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiptModal;
