import { Container, Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis-covid19";
import CountrySelector from "./Components-covid19/CountrySelector";
import HighLight from "./Components-covid19/HighLight";
import Summary from "./Components-covid19/Summary";
import 'moment/locale/vi';
import '@fontsource/roboto';

moment.locale('vi');

export default function Covid19() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [report, setReport] = useState([]);

    useEffect(() => {
        getCountries().then((res) => {
            console.log({ res });

            const countries = sortBy(res.data, 'Country');
            setCountries(countries);

            setSelectedCountryId('vn');
        });
    }, []);

    const handleOnChange = (e) => {
        setSelectedCountryId(e.target.value);
    };

    useEffect(() => {
        if (selectedCountryId) {
        const { Slug } = countries.find(
            (country) => country.ISO2.toLowerCase() === selectedCountryId
        );
        getReportByCountry(Slug).then(res => {
            res.data.pop();
            setReport(res.data)
        });
        }
    }, [countries, selectedCountryId]);
    return (
        <Container style={{ marginTop: 20 }}>
        <p>Ngô Tấn Thành</p>
        <Typography variant="h2" component='h2'>
            Số liệu COVID-19
        </Typography>
        <Typography>{moment().format('LLL')}</Typography>
        <CountrySelector 
            countries={countries} 
            handleOnchange={handleOnChange}
            value={selectedCountryId} />
        <HighLight report={report} />
        <Summary report={report} selectedCountryId={selectedCountryId} />
        </Container>
    );
}
