import {useCallback, useState} from "react";
import newsCategoryList from "@/constants/Categories";
import CountryList from "@/constants/CountryList";

export const useNewsCountries = () => {
    const [countryList, setCountryList] = useState(CountryList);
    const toggleCountry = useCallback( (code: string) => {
            setCountryList((prevCategories)=> {
                return prevCategories.map((item)=> {
                    if (item.code === code) {
                        return {
                            ...item,
                            selected: !item.selected
                        }
                    }
                    return item
                })
            })
        },
        [],);

    return {
        countryList, toggleCountry
    }
}
