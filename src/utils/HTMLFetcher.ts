import axios from 'axios';

export default async (url: string) => {

    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error(
          `ERROR: An error occurred while trying to fetch the URL: ${url}`
        );
    }

}