import { useState, useEffect } from 'react';
import { Country, State, City }  from 'country-state-city';
import { useAuth } from '../../contexts/AuthContext';
import { useFormContext } from '../contexts/FormContext';

const  SelectionDropdown = ({ errors, selectionData}) => {
    const { setUser } = useAuth();
    const {formData, setFormData} = useFormContext();
    console.log("SelectionFormData:", formData);
    
    useEffect(() => {

        const fetchStateOfCountry = () => {
            const stateofCountry = State.getStatesOfCountry('NG');
            selectionData.setStates(stateofCountry);
        }

        fetchStateOfCountry()
    }, [selectionData.countries])
    // console.log("States:", State.getStateByCodeAndCountry('LA', 'NG'))

    const fetchStateOfCountry = (value) => {
        const stateofCountry = State.getStatesOfCountry(value);
        selectionData.setStates(stateofCountry);
    }

    const fetchCitiesOfState = (value) => {
        if(selectionData.states.length > 0) {
            const state = selectionData.states.find((state) => state.isoCode === value);
            const citiesofState = City.getCitiesOfState(state.countryCode, state.isoCode);
            selectionData.setCities(citiesofState);
        }
    }

    // const handleCountryChange = (e) => {
    //     const value = e.target.value;
    //     selectionData.setSelectedCountry(value);
    //     fetchStateOfCountry(value);
    //     getCountryValue(value);
    //     setUser({
    //         message: "Welcome Big Jay To Context",
    //     })
    // }

    const getCountryValue = (code) => {
        const country = selectionData.countries.find(country => country.isoCode == code);
        setFormData({
            ...formData, 
            country: country?.name,
        })
    }

    const getStateValue = (code) => {
        const state = selectionData.states.find(state => state.isoCode == code);
        console.log("State:", state);
        setFormData({
            ...formData, 
            state: state?.name,
        })
    }

    const getCityValue = (code) => {
        const city = selectionData.cities.find(city => city?.name == code);
        setFormData({
            ...formData, 
            city: city?.name,
        })
    }
 
    const handleStateChange = (e) => {
        const value = e.target.value;
        selectionData.setSelectedState(value);
        getStateValue(value);
        fetchCitiesOfState(value)
    }


    const handleCityChange = (e) => {
        const value = e.target.value;
        selectionData.setSelectedCity(value);
        getCityValue(value);
    }

    return (
        <div className="flex flex-col gap-6 my-6 w-full">
            {/* <div className="flex flex-col justify-start items-start gap-4">
                <label className="text-primary font-bold text-lg">Country:</label>
                <select 
                    onChange={(e) => handleCountryChange(e)}
                    className="rounded-lg border-2 border-solid border-gray-400" 
                >
                    <option defaultValue={"-----Select Country----"}>-----Select Country-----</option>
                    {selectionData.countries.map((country, i) => (
                        <option 
                            key={i} 
                            value={country.isoCode}
                        >
                             {country.name}
                        </option>
                    ))}
                </select>
                <p className='text-red-400'>{errors.country}</p>
            </div> */}

            <div className="flex flex-col justify-start items-start gap-4">
                <label className="text-primary font-bold text-lg">States:</label>

                <select
                     onChange={(e) => handleStateChange(e)}
                     className="rounded-lg  border-2 border-solid border-gray-400 w-[100%] px-10" 
                >
                <option defaultValue={"-----Select State----"}>-----Select State----</option>
                {
                    selectionData.states.length > 0 ?
                    selectionData.states.map((state, i) => (
                        <option
                            key={i} 
                            value={state.isoCode}
                        >
                            {state.name}
                        </option>
                    ))

                    :
                    <option>No States Found</option>
                }
                </select>
                <p className='text-red-400'>{errors.state}</p>
            </div>

            <div className="flex flex-col justify-start items-start gap-4">
                <label className="text-primary font-bold text-lg">City:</label>
                <select
                     onChange={(e) => handleCityChange(e)}
                     className="rounded-lg border-2 border-solid border-gray-400 w-[100%] px-10" 
                >
                <option defaultValue={"-----Select City----"}>-----Select City----</option>
                {
                    selectionData.cities.length > 0 ?
                    selectionData.cities.map((city, i) => (
                        <option
                            key={i} 
                            value={city.name}
                        >
                            {city.name}
                        </option>
                    ))

                    :
                    <option>No Cities Found</option>
                }
                </select>
                <p className='text-red-400'>{errors.city}</p>
            </div>
        </div>
    )
}

export default SelectionDropdown