import React, { useEffect, useState, CSSProperties } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import {
  confirmOrderbyId,
  deliveredOrderbyId,
  getUserbyId,
} from '../../../Pages/Login1/helpers/helper';
import { cancelOrderbyId, getOrderbyId } from '../users/helper';
const ViewOrder = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { _orderid } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [address, setAddress] = useState();
  const [status, setStatus] = useState();
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [userid, setUserID] = useState('');
  useEffect(() => {
    let orderPromise = getOrderbyId(_orderid);
    orderPromise.then(function (res) {
      let address = res.data[0].diachigiaohang;
      let date = res.data[0].ngaylap;
      let status = res.data[0].tinhtrang;
      let total = res.data[0].tongtien;
      let tabledata = res.data[0].sanphams;

      let _userid = res.data[0].userId;
      console.log(_userid);
      setAddress(address);
      setDate(date);
      setStatus(status);
      setTotal(total);
      setTableData(tabledata);
      setIsLoading(false);
      setUserID(_userid);
      let forgotPromise = getUserbyId(_userid);
      forgotPromise.then(function (res) {
        let { email, name, phone } = res.data;
        setEmail(email);
        setPhone(phone);
        setName(name);
      });
      // This function will run once when the component mounts.
    });
  }, []); // The empty array as the second argument means this effect will only run once.
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'green',
  };

  function goBackClick() {
    navigate(-1);
  }
  async function ConfirmOrder() {
    let confirmPromise = await confirmOrderbyId(_orderid, email, total);
    window.location.reload();
  }
  async function CancelOrder() {
    let cancelPromise = await cancelOrderbyId(_orderid);

    window.location.reload();
  }
  return (
    <Container style={{ width: '1300px' }}>
      <ClipLoader
        color="#36d7b7"
        loading={isLoading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {isLoading ? (
        <div className="w-40 h-40"></div>
      ) : (
        <div>
          <div className="row mb-5 order-info-wrap">
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-user"> </i>{' '}
                </span>{' '}
                <div className="text">
                  <h6 className="mb-1"> Khách hàng </h6>{' '}
                  <p className="mb-1">
                    {name} <br />
                    <a href={`mailto:user@example.com`}> {email} </a> <br />
                    <p>{phone}</p>
                  </p>{' '}
                </div>{' '}
              </article>{' '}
            </div>{' '}
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-truck-moving"> </i>{' '}
                </span>{' '}
                <div className="text">
                  <h6 className="mb-1"> Ngày đặt hàng </h6>{' '}
                  <p className="mb-1">{date}</p>{' '}
                </div>{' '}
              </article>{' '}
            </div>{' '}
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-map-marker-alt"> </i>{' '}
                </span>{' '}
                <div className="text">
                  <h6 className="mb-1"> Địa chỉ giao hàng </h6>{' '}
                  <p className="mb-1">{address}</p>{' '}
                </div>{' '}
              </article>{' '}
            </div>{' '}
          </div>
          <table className="table border table-lg">
            <thead>
              <tr>
                <th
                  style={{
                    width: '40%',
                  }}
                >
                  {' '}
                  Sản phẩm{' '}
                </th>{' '}
                <th
                  style={{
                    width: '20%',
                  }}
                >
                  {' '}
                  Đơn giá{' '}
                </th>{' '}
                <th
                  style={{
                    width: '20%',
                  }}
                >
                  Số lượng
                </th>{' '}
                <th
                  style={{
                    width: '20%',
                  }}
                  className="text-end"
                >
                  Thành tiền{' '}
                </th>{' '}
              </tr>{' '}
            </thead>{' '}
            <tbody>
              {tableData?.map((data, index) => (
                <tr key={index}>
                  <td>
                    <Link className="itemside" to="#">
                      <div className="left">
                        <img
                          src={data.hinhanh}
                          alt="product"
                          style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 10px 10px 0',
                          }}
                          className="img-xs"
                        />
                      </div>
                      <div className="info" style={{ marginLeft: '10px' }}>
                        {data.sanpham}
                      </div>
                    </Link>
                  </td>
                  <td>{data.dongia.toLocaleString()} VND</td>
                  <td>
                    <div style={{ marginLeft: '20px' }}>{data.sl}</div>{' '}
                  </td>
                  <td className="text-end">
                    {data.thanhtien.toLocaleString()} VND
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">
                  <article className="float-end">
                    <dl className="dlist">
                      <dt> Tổng tiền : </dt>
                      <dd>
                        <b className="h5">{total.toLocaleString()} VND </b>
                      </dd>
                    </dl>
                    <dl className="dlist ">
                      <dt className="text-muted " style={{ marginTop: '10px' }}>
                        Trạng thái:
                      </dt>
                      <dd>
                        <span
                          className={
                            status === 'Đã giao hàng'
                              ? 'badge rounded-pill alert alert-success text-success'
                              : status === 'Đang xử lý'
                              ? 'badge rounded-pill alert alert-success text-info'
                              : status === 'Đang giao hàng'
                              ? 'badge rounded-pill alert alert-success text-warning'
                              : 'badge rounded-pill alert alert-success text-danger'
                          }
                          style={{ marginTop: '20px' }}
                        >
                          {status}
                        </span>
                      </dd>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        onClick={goBackClick}
                      >
                        Quay lại
                      </button>
                      {status === 'Đang xử lý' ? (
                        <>
                          <button
                            type="button"
                            class="btn btn-primary "
                            onClick={ConfirmOrder}
                            style={{ marginLeft: '20px' }}
                          >
                            Xác nhận
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={CancelOrder}
                            style={{ marginLeft: '20px' }}
                          >
                            Hủy đơn hàng
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </dl>
                  </article>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default ViewOrder;
