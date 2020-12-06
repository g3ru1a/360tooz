import axios from 'axios';

export default async (url: string) => {
    console.log('Fetching HTML ...');
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error(
          `ERROR: An error occurred while trying to fetch the URL: ${url}`
        );
    }

}