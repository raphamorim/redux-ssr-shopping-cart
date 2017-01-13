export function fetchDevelopers(setData, {query}) {
    fetch('/api/developers')
        .then(res => res.json())
        .then((responseData) => {
            if(responseData){
                setData(responseData);
            }
        })
}