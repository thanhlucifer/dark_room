const fetchData = async () => {
    const response = await fetch('./../data/Data.json'); 
    const data = await response.json();
    return data;
};


