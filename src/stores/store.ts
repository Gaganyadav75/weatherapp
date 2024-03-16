import { readable, writable, type Writable } from 'svelte/store';

// Define the type of your store state

import type {WeatherStructure} from '$lib/weatherInfo'

// weather data main store
export const weatherStoredData: Writable<Array<WeatherStructure>> = writable([]);

//selected date and time store

export const selectedDateTime: Writable<{
  date: String,
  time: String,
}
> = writable();

export const Loading: Writable<boolean> = writable();
