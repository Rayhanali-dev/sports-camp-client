import React from 'react'
import usePaymentHistory from '../../../hooks/usePaymentHistory';
import { Helmet } from 'react-helmet-async';
import Title from '../../../components/Title';
import moment from 'moment';

function PaymentHistory() {
  const [paymentHistory] = usePaymentHistory();
  const formatDateTime = (date) => {
    return moment(date).format('HH:mm:ss,  DD-MM-YYYY');
  };

  return (
    <>
      <Helmet>
        <title>Payment History| Nexus Sports</title>
      </Helmet>
      <div className="my-8">
        <Title heading={"Payment History"} subHeading={"You can see your payment history here"} />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className='bg-base-300'>
              <th>Index</th>
              <th>Images</th>
              <th>Class Name</th>
              <th className='text-center'>Transaction Id</th>
              <th>Price</th>
              <th className='text-center'>Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {

              paymentHistory.map((classData, index) =>
                <tr key={classData._id} className='border-b-2 border-b-base-300'>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={classData.enrolledClassImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{classData.enrolledClassName}</td>
                  <td className='text-center'>{classData.transactionId}</td>
                  <td className='text-center font-semibold'>${classData.price}</td>
                  <td className='text-center'>{formatDateTime(classData.date)}</td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PaymentHistory;