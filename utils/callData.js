const fetchData = async () => {
    const response = await fetch('./../data/Data.json'); // Update the path accordingly
    const data = await response.json();
    return data;
};


