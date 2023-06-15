import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
    const {data: classes = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['classes'],
        queryFn: async() => {
            const res = await fetch('https://sports-camp-rayhanali-dev.vercel.app/classes');
            return res.json();
        }
    })
    return [classes, loading, refetch]
}

export default useClasses;