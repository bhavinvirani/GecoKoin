const Columns = [
    {
      id: "rank",
      label: "#",
      maxWidht: 40,
      align: "right",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "coin",
      label: "Coin",
      minWidth: 170,
      align: "right",
    },
    {
      id: "price",
      label: "Price",
      minWidth: 100,
      align: "right",
    },
    {
      id: "24h_change",
      label: "change (24h)",
      minWidth: 170,
      align: "right",
    },
    {
      id: "market_cap",
      label: "Market Cap",
      minWidth: 170,
      align: "right",
    },
    {
      id: "24h_low",
      label: "24h Low",
      minWidth: 170,
      align: "right",
    },
    {
      id: "24h_heigh",
      label: "24h High",
      minWidth: 170,
      align: "right",
    },
  ];

export default Columns;
