//Develop a HTTP microservice to display all trains in next 25 hours with their seat availability with their arriving
const TrainList = () => {
    const [trains, setTrains] = useState([]);
  
    useEffect(() => {
      fetchTrains();
    }, []);
  
    const fetchTrains = async () => {
      try {
        const response = await fetch('/api/trains');
        const data = await response.json();
  
        setTrains(data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };
  
    return (
      <div>
        <h1>Train Availability</h1>
        {trains.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Train Number</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Seat Availability</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
            {trains.map(train => (
              <tr key={train.train_number}>
                <td>{train.train_number}</td>
                <td>{train.departure_time}</td>
                <td>{train.arrival_time}</td>
                <td>{train.seat_availability}</td>
                <td>{train.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TrainList;
