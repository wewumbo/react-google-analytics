import React from "react";
import {
  Table,
  Input,
  Button,
  Icon,
  Select as SelectAnt,
  DatePicker,
  Modal
} from "antd";
import Highlighter from "react-highlight-words";
import { Card, CardBody } from "reactstrap";
import Select from "react-select";

const { Option } = SelectAnt;
const { RangePicker } = DatePicker;

const optionsStatus = [
  { value: "Cancelled", label: "Cancelled" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Modified", label: "Modified" }
];

const optionsSource = [
  { value: "FIT", label: "FIT" },
  { value: "OTA", label: "OTA" },
  { value: "TA", label: "TA" }
];

const optionsBookingBy = [
  { value: "Booking Day", label: "Booking Day" },
  { value: "Value", label: "Value" }
];

const data = [
  {
    booking_id: "1212",
    customer_name: "Test Test",
    check_in_date: "2019-09-12",
    price: 75.6,
    source: "OTA",
    channel_website: "http://www.layahotels.lk/layabeach.php",
    agent: "",
    country: "",
    status: "settled",
    booking_date: "2019-08-03 11:37:39",
    check_out_date: "2019-09-13"
  },
  {
    booking_id: "1236",
    customer_name: "dinesh dicamdugoda",
    check_in_date: "2019-08-10",
    price: 75.6,
    source: "OTA",
    channel_website: "http://www.layahotels.lk/layabeach.php",
    agent: "",
    country: "",
    status: "settled",
    booking_date: "2019-08-10 07:59:52",
    check_out_date: "2019-08-11"
  },
  {
    booking_id: "1237",
    customer_name: "dinesh eranga",
    check_in_date: "2019-08-10",
    price: 75.6,
    source: "OTA",
    channel_website: "http://www.layahotels.lk/layabeach.php",
    agent: "",
    country: "",
    status: "settled",
    booking_date: "2019-08-10 08:56:01",
    check_out_date: "2019-08-11"
  },
  {
    booking_id: "1179",
    customer_name: "First Name Last name",
    check_in_date: "2019-07-29",
    price: 607.5,
    source: "OTA",
    channel_website: "http://www.layahotels.lk/layabeach.php",
    agent: "",
    country: "",
    status: "settled",
    booking_date: "2019-07-27 16:34:32",
    check_out_date: "2019-07-30"
  },
  {
    booking_id: "1180",
    customer_name: "First Name Last name",
    check_in_date: "2019-07-29",
    price: 607.5,
    source: "OTA",
    channel_website: "http://www.layahotels.lk/layabeach.php",
    agent: "",
    country: "",
    status: "settled",
    booking_date: "2019-07-27 16:39:55",
    check_out_date: "2019-07-30"
  },
  {
    booking_id: "1181",
    customer_name: "First Name Last name",
    check_in_date: "2019-07-29",
    price: 607.5,
    source: "OTA",
    channel_website: "http://www.layahotels.lk/layabeach.php",
    agent: "",
    country: "",
    status: "settled",
    booking_date: "2019-07-27 16:40:03",
    check_out_date: "2019-07-30"
  },
  {
    booking_id: "1168",
    customer_name: "Abiserck Mathanasegar",
    check_in_date: "2019-07-27",
    price: 121.5,
    source: "OTA",
    channel_website: "http://www.layahotels.lk/layabeach.php",
    agent: "",
    country: "",
    status: "settled",
    booking_date: "2019-07-26 10:30:58",
    check_out_date: "2019-07-28"
  },
  {
    booking_id: "1012",
    customer_name: "Janith vinu",
    check_in_date: "",
    price: 0,
    source: "OTA",
    channel_website: "",
    agent: "",
    country: "",
    status: "settled",
    booking_date: "2019-06-15 11:43:11",
    check_out_date: ""
  }
];

export default class App extends React.Component {
  state = {
    searchText: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),

    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  showModalDetail = data => {
    Modal.info({
      title: "Detail Booking",
      content: (
        <div style={{ marginTop: "35px", fontWeight: 600 }}>
          <p>Booking ID: {data.booking_id}</p>
          <p>Customer: {data.customer_name}</p>
          <p>Booking Date: {data.booking_date}</p>
          <p>Status: {data.status}</p>
          <p>Price: {data.price} $</p>
          <hr />
        </div>
      ),
      centered: true,
      onOk() {}
    });
  };

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  render() {
    const columns = [
      {
        title: "Booking ID",
        dataIndex: "booking_id",
        key: "booking_id",
        sorter: true,
        width: "10%",
        ...this.getColumnSearchProps("booking_id")
      },
      {
        title: "Customer Name",
        dataIndex: "customer_name",
        key: "customer_name",
        sorter: true,
        width: "10%",
        ...this.getColumnSearchProps("customer_name")
      },
      {
        title: "Check in Date",
        dataIndex: "check_in_date",
        key: "check_in_date",
        sorter: true,
        width: "10%",
        ...this.getColumnSearchProps("check_in_date")
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        sorter: true,
        width: "10%",
        ...this.getColumnSearchProps("price")
      },
      {
        title: "Source",
        dataIndex: "source",
        key: "source",
        sorter: true,
        width: "10%",
        ...this.getColumnSearchProps("source")
      },
      {
        title: "Channel Website",
        dataIndex: "channel_website",
        key: "channel_website",
        sorter: true,
        width: "10%",
        ...this.getColumnSearchProps("channel_website")
      },
      {
        title: "Agent",
        dataIndex: "agent",
        key: "agent",
        width: "10%",
        sorter: true,
        ...this.getColumnSearchProps("agent")
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        width: "10%",
        sorter: true,
        ...this.getColumnSearchProps("country")
      },
      {
        title: "Status",
        dataIndex: "status",
        width: "10%",
        sorter: true,
        ...this.getColumnSearchProps("status"),
        render: (text, record, index) => (
          <div
            style={{
              backgroundColor: "#59af51",
              borderRadius: "10%",
              width: "60px",
              textAlign: "center",
              color: "white"
            }}
          >
            {text}
          </div>
        )
      },
      {
        title: "Booking Date",
        dataIndex: "booking_date",
        key: "booking_date",
        width: "10%",
        sorter: true,
        ...this.getColumnSearchProps("booking_date")
      },
      {
        maxWidth: "5%",
        render: row => (
          <Button onClick={() => this.showModalDetail(row)}>View</Button>
        )
      }
    ];

    return (
      <Card>
        <CardBody className="">
          <div className="form-group row" style={{ marginBottom: "40px" }}>
            <div className="col-sm-3">
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "10px",
                  fontSize: "17px"
                }}
              >
                Booking By
              </div>
              <Select
                defaultValue={[]}
                name="Days"
                isClearable
                options={optionsBookingBy}
                className="basic-multi-select"
                classNamePrefix="select"
                // onChange={this.onChangeFilter("CATEGORY")}
              />
            </div>
            <div className="col-sm-3">
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "10px",
                  fontSize: "17px"
                }}
              >
                Date Range
              </div>
              <RangePicker size="large" onChange={this.onChangeDate} />
            </div>
            <div className="col-sm-3">
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "10px",
                  fontSize: "17px"
                }}
              >
                Booking status
              </div>
              <Select
                defaultValue={[]}
                isMulti
                name="bookingStatus"
                options={optionsStatus}
                className="basic-multi-select"
                classNamePrefix="select"
                //onChange={this.onChangeFilter("DAYS")}
              />
            </div>
            <div className="col-sm-3">
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "10px",
                  fontSize: "17px"
                }}
              >
                Booking Source
              </div>
              <Select
                defaultValue={[]}
                isMulti
                name="source"
                options={optionsSource}
                className="basic-multi-select"
                classNamePrefix="select"
                //onChange={this.onChangeFilter("VIEWS")}
              />
            </div>
          </div>
          <div style={{ marginBottom: "30px", display: "flex" }}>
            <Button style={{ marginRight: "10px" }}>
              <Icon type="printer" style={{ color: "#2f96f3" }} /> Print
            </Button>
            <Button style={{ marginRight: "10px" }}>
              <Icon type="file-excel" style={{ color: "#72bf75" }} /> Excel
            </Button>
            <Button>
              <Icon type="file-pdf" style={{ color: "red" }} /> PDF
            </Button>
            <div style={{ marginLeft: "30px" }}>
              Show
              <SelectAnt
                defaultValue={10}
                style={{ width: 80, margin: "0 10px" }}
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </SelectAnt>
              entries
            </div>
          </div>
          <Table columns={columns} dataSource={data} />
        </CardBody>
      </Card>
    );
  }
}
