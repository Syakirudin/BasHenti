const dummyData = [
    {
      route_no: 1,
      route_name: "Route 1",
      stops: ["Stop 1", "Stop 2", "Stop 3"],
      schedule: [
        { departure_time: "08:00 AM", arrival_time: "08:30 AM" },
        { departure_time: "09:00 AM", arrival_time: "09:30 AM" },
        { departure_time: "10:00 AM", arrival_time: "10:30 AM" },
      ],
      fare: 5.00, // in currency units
    },
    {
      route_no: 2,
      route_name: "Route 2",
      stops: ["Stop 4", "Stop 5", "Stop 6"],
      schedule: [
        { departure_time: "08:15 AM", arrival_time: "08:45 AM" },
        { departure_time: "09:15 AM", arrival_time: "09:45 AM" },
        { departure_time: "10:15 AM", arrival_time: "10:45 AM" },
      ],
      fare: 4.50, // in currency units
    },
    {
      route_no: 3,
      route_name: "Route 3",
      stops: ["Stop 7", "Stop 8", "Stop 9"],
      schedule: [
        { departure_time: "08:30 AM", arrival_time: "09:00 AM" },
        { departure_time: "09:30 AM", arrival_time: "10:00 AM" },
        { departure_time: "10:30 AM", arrival_time: "11:00 AM" },
      ],
      fare: 6.00, // in currency units
    },
    {
      route_no: 4,
      route_name: "Route 4",
      stops: ["Stop 10", "Stop 11", "Stop 12"],
      schedule: [
        { departure_time: "08:45 AM", arrival_time: "09:15 AM" },
        { departure_time: "09:45 AM", arrival_time: "10:15 AM" },
        { departure_time: "10:45 AM", arrival_time: "11:15 AM" },
      ],
      fare: 5.50, // in currency units
    },
    {
      route_no: 5,
      route_name: "Route 5",
      stops: ["Stop 13", "Stop 14", "Stop 15"],
      schedule: [
        { departure_time: "09:00 AM", arrival_time: "09:30 AM" },
        { departure_time: "10:00 AM", arrival_time: "10:30 AM" },
        { departure_time: "11:00 AM", arrival_time: "11:30 AM" },
      ],
      fare: 4.75, // in currency units
    },
  ];
  
  export default dummyData;
  