import React, {useState,useEffect} from "react";
import useAxios from "../../../client/utils/useAxios";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { format } from "date-fns";




const RecentTransactions = ({ item }) => {
    const {id, status, created_at, total_price} = item;
    const theme = useTheme();
    
    const orders = useAxios();
    const colors = tokens(theme.palette.mode);

    const formatDate = (isoDateString) => {
      if(!isoDateString){return;}
      const date = new Date(isoDateString);
      return format(date, 'dd MMM, yyyy');
    };


    return (
      <Box
      key={{id}}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`4px solid ${colors.primary[500]}`}
      p="15px"
    >
      <Box>
        <Typography
          color={colors.greenAccent[500]}
          variant="h5"
          fontWeight="600"
        >
          {id}
        </Typography>
        <Typography color={colors.grey[100]}>
          {status}
        </Typography>
      </Box>
      <Box color={colors.grey[100]}>{formatDate(created_at)}</Box>
      <Box
        backgroundColor={colors.greenAccent[500]}
        p="5px 10px"
        borderRadius="4px"
      >
        ${total_price.toLocaleString('de-DE')}
      </Box>
    </Box>
      );
    };
    
    export default RecentTransactions;