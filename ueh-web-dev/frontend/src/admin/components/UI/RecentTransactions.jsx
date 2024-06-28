import React, {useState,useEffect} from "react";
import useAxios from "../../../client/utils/useAxios";




const RecentTransactions = ({ item }) => {
    const {id, username, created_at, total_price} = item;
    const [orderRecent,setorderRecent] = useState([]);
    const orders = useAxios();


    return (
        <Box>
          <Box>
            <Typography color="greenAccent" variant="h5" fontWeight="600">
              {id}
            </Typography>
            <Typography color="grey">
              {username}
            </Typography>
          </Box>
          <Box color="grey">{created_at}</Box>
          <Box
            backgroundColor="greenAccent"
            p="5px 10px"
            borderRadius="4px"
          >
            ${total_price}
          </Box>
        </Box>
      );
    };
    
    export default RecentTransactions;