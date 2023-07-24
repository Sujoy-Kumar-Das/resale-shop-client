import React from "react";

const HardWareConfigTable = ({ productDetail }) => {
  return (
    <table className="table">
      <tbody>
        <tr className=" hover">
          <th>Display</th>
          <td>{productDetail?.specification?.Display}</td>
        </tr>
        <tr className=" hover">
          <th>Graphics</th>
          <td>{productDetail?.specification?.Graphics}</td>
        </tr>
        <tr className=" hover">
          <th>Processor</th>
          <td>{productDetail?.specification?.Processor}</td>
        </tr>
        <tr className=" hover">
          <th>RAM</th>
          <td>{productDetail?.specification?.RAM}</td>
        </tr>
        <tr className=" hover">
          <th>Storage</th>
          <td>{productDetail?.specification?.Storage}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default HardWareConfigTable;
