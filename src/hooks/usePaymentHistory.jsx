import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';


const usePaymentHistory = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: paymentHistory = [] } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/payments-history?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [paymentHistory,  refetch]

}
export default usePaymentHistory;