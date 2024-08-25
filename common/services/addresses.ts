import axios from 'axios';
import { LOCATIONIQ_API_KEY, LOCATIONIQ_API_URL } from '../config';

interface AddressItem {
  name: string;
  house_number: string;
  road: string;
  suburb: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface AddressResponse {
  place_id: string;
  osm_id: string;
  osm_type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: Partial<AddressItem>;
}

export const getAddresses = async (text: string) => {
  const { data } = await axios.get<AddressResponse[]>(
    `${LOCATIONIQ_API_URL}/autocomplete?q=${text}&dedupe=1&limit=5&key=${LOCATIONIQ_API_KEY}`
  );

  return Array.isArray(data) ? data : [];
};
