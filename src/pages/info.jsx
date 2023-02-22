import React from "react";
import styled from "styled-components";
import { Schedule } from "../components/schedule";
import { SponsorElement } from "../components/sponsorElement";

import { Agenda } from "@phoenixlan/phoenix.js";
import { useEffect } from "react";
import { useState } from "react";

const S = {
    RootContainer: styled.div`
        display: flex;
        font-family: "Roboto", sans-serif;
        flex-flow: column;
        margin: 1vw;
        height: calc(100vh - 2vw);
    `,

    LoadingContainer: styled.div`
        display: ${props => props.loading ? "flex" : "none"};
    `,


    DefaultContainer: styled.div`
        display: ${props => props.loading ? "none" : "flex"};
        font-family: 'Roboto', sans-serif;
        flex-flow: column;
        margin: 1vw;
        height: calc(100vh - 2vw);
        user-select: none;
    `,
        HeaderContainer: styled.div`
            display: flex;
            flex-flow: column;
            flex: 0;
        `,
            LogoContainer: styled.div`
                flex: 1;
            `,
                Logo: styled.div`
                    margin-bottom: 0.5vw;
                `,
                    LogoElement: styled.img`
                        width: 6vw;
                    `,
            ClockContainer: styled.div`
                flex: 0;
                margin: auto;
            `,
                Clock: styled.div`
                    display: flex;
                    flex-flow: row;
                    font-size: 2.75vw;
                    font-weight: 400;
                    letter-spacing: 0.2em;
                `,
                    ClockElement: styled.span`
                    `,


        MiddleContainer: styled.div`
            display: flex;
            flex: 1;
            overflow: hidden;
        `,
            ShadowWrapper: styled.div`
                flex: 1;
            `,
            ScheduleContainer: styled.div`
                display: flex;
                flex-flow: column;
            `,
            PrimarySideContainer: styled.div`
                display: flex;
                flex: 3;
            `,
                MapContainer: styled.div`
                    width: 100%;
                `,
                    Map: styled.img`
                        width: 100%;
                    `,
            SecondarySideContainer: styled.div`
                display: flex;
                flex-flow: column;
                flex: 2;
            `,

        BottomContainer: styled.div`
            display: flex;
            flex: 0;
        `,
            SponsorContainer: styled.div``,
            SponsorElements: styled.div`
                display: flex;
                flex-flow: row;
                margin: auto;
            `,

        ColumnContainer: styled.div`
            display: flex;
            flex-flow: column;
            flex: ${props => props.flex ? props.flex : "1"};
        `,
        RowContainer: styled.div`
            display: flex;
            flex-flow: row;
            flex: 1;
            gap: 6em;
        `,
        Title: styled.h3`
            font-size: 1.25vw;
        `,
        Text: styled.span`
            letter-spacing: .1em;
        `,
}

export const Info = () => {

    const messages = [
        "Ikke glem å drikk vann og få frisk luft",
        "I år skjer ikke alt foran datamaskinen, besøk multisalen og kafeen og prøv arkademaskiner, VR-briller, Nintento-switch og andre konsoller og spill vi kan tilby!",
        "Nettet vårt er sponset av HomeNET, de sørger for en 10 Gbps linje til LANet! Besøk oss i Tech om du er interessert i nettverket vårt!"
    ]

    const [ activeNr, setActiveNr ] = useState(0);
    //const [ activeMessage, setActiveMessage] = useState(undefined);

    const [ loading, setLoading ] = useState(true);
    const [ agenda, setAgenda ] = useState([]);
    const [ agendaError, setAgendaError ] = useState(false);
    const [ clock, setClock ] = useState(null);

    const getMessages = () => {
        const arrayLength = messages.length;
        const x = activeNr;
        //console.log(arrayLength);
        
        if(x < arrayLength) {
            setActiveNr(activeNr => activeNr + 1);
            //console.log("+1 /// " + activeNr);
        }
        if(x > arrayLength) {
            setActiveNr(0);
            //console.log("=0 /// " + activeNr);
        }
    }

    useEffect(() => {
        const initialise = async () => {
            // Show loading container
            setLoading(true);

            // Create clock
            const dateTime = new Date();
            setClock(String(dateTime.toLocaleTimeString('no', {hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Oslo'})));

            // Attempt to fetch agendadata from the API
            try {
                const agendaData = await Agenda.getAgenda();
                if (agendaData) {
                    setAgenda(agendaData);
                }    
            } catch(e) {
                console.error("An error occured while attempting to fetch data from agendadata from API.");
                console.error("Response: " + e);
            }
            
            // Disable the loading container and show the page.
            setLoading(false);
        }
        const inner = async () => {
            
            // Update clock
            const dateTime = new Date();
            setClock(String(dateTime.toLocaleTimeString('no', {hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Oslo'})));

            // Attempt to fetch agendadata from the API
            try {
                const agendaData = await Agenda.getAgenda();

                if(agendaData) {
                    setAgenda(agendaData);
                    setAgendaError(false);
                }
            } catch(e) {
                console.error("An error occured while attempting to fetch data from agendadata from API.");
                console.error("Response: " + e);
                setAgendaError(true);
            }
        }
        
        // Initialise the code
        initialise();

        // Create intervals for updating the page
        const interval = setInterval(() => {
            inner();
        }, 30000);
        const longInterval = setInterval(() => {
            getMessages();
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(longInterval);
        };
    }, []);

    return (
        <>
            { /* Loading container */}
            <S.LoadingContainer loading={loading}>
                Vennligst vent ...
            </S.LoadingContainer>

            { /* Error container */}
            

            { /* Normal condition container */}
            <S.DefaultContainer loading={loading}>
                <S.HeaderContainer>
                    <S.RowContainer>
                        <S.LogoContainer>
                            <S.Logo>
                                <S.LogoElement src="logo.svg" />
                            </S.Logo>
                        </S.LogoContainer>
                        <S.ClockContainer>
                            <S.Clock>
                                {clock}
                            </S.Clock>
                        </S.ClockContainer>
                    </S.RowContainer>
                </S.HeaderContainer>

                <S.MiddleContainer>
                    <S.ShadowWrapper>
                        <S.RowContainer>
                            <S.ColumnContainer flex="3">
                                <S.ScheduleContainer>
                                    <Schedule agenda={agenda} error={agendaError} />
                                </S.ScheduleContainer>
                            </S.ColumnContainer>
                            <S.ColumnContainer flex="2">
                                <S.PrimarySideContainer> { /* Place image/posters here */}
                                    <S.MapContainer>
                                        <S.Map src="/map.png" />
                                    </S.MapContainer>
                                </S.PrimarySideContainer>
                                <S.SecondarySideContainer> { /* Place pure text here */}
                                    <S.Title>
                                        Beskjeder fra PhoenixLAN
                                    </S.Title>
                                    <S.Text>
                                    </S.Text>
                                </S.SecondarySideContainer>
                            </S.ColumnContainer>
                        </S.RowContainer>
                    </S.ShadowWrapper>
                </S.MiddleContainer>

                <S.BottomContainer>
                    <S.RowContainer>
                        <S.SponsorContainer>
                            <S.RowContainer>
                                <S.Title>
                                    Sponsorer
                                </S.Title>
                            </S.RowContainer>

                            <S.RowContainer>
                                <S.SponsorElements>
                                    <SponsorElement value="homenet" type="png" alt="Sponsor HomeNET" />
                                    <SponsorElement value="askerkommune" type="svg" alt="Sponsor Asker Kommune" />
                                    <SponsorElement value="bleikervgs" type="png" alt="Sponsor Bleiger Videregående Skole" />
                                </S.SponsorElements>
                            </S.RowContainer>
                        </S.SponsorContainer>
                    </S.RowContainer>
                </S.BottomContainer>
            </S.DefaultContainer>
        </>
    )
}