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
        font-family: "Segoe UI";
        flex-flow: column;
        margin: 1.5em;
        height: calc(100vh - 3em);
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
                `,
                    LogoElement: styled.img`
                        width: 8em;
                    `,
            ClockContainer: styled.div`
                flex: 0;
                margin: auto;
            `,
                Clock: styled.div`
                    display: flex;
                    flex-flow: row;
                    font-size: 3em;
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
                z-index: 1000;
            `,
            ScheduleContainer: styled.div`
                display: flex;
                flex-flow: column;
            `,
            PrimarySideContainer: styled.div`
                display: flex;
                flex: 3;
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
        `,
        Text: styled.span`
            letter-spacing: .1em;
        `,
}

export const Info = () => {

    const messages = [
        {
            "message":"Ikke glem å drikk vann og få frisk luft",
        },
        {
            "message":"I år skjer ikke alt foran datamaskinen, besøk multisalen og kafeen og prøv arkademaskiner, VR-briller, Nintento-switch og andre konsoller og spill vi kan tilby!"
        },
        {   
            "message":"Nettet vårt er sponset av HomeNET, de sørger for en 10 Gbps linje til LANet!"
        }
    ]

    const [ activeNr, setActiveNr ] = useState(0);
    const [ activeMessage, setActiveMessage] = useState(undefined);

    const [ loading, setLoading ] = useState(true);
    const [ agenda, setAgenda ] = useState([]);
    const [ minutes, setMinutes ] = useState(undefined);
    const [ hours, setHours ] = useState(undefined)

    useEffect(() => {
        const inner = async () => {
            setLoading(true);
            const agendaData = await Agenda.getAgenda();
            const dateTime = new Date();
            setHours(String(dateTime.getHours()).padStart(2, '0'));
            setMinutes(String(dateTime.getMinutes()).padStart(2, '0'));
            setAgenda(agendaData);
            setLoading(false);
        }
        const getMessages = () => {
            const arrayLength = messages.length;

            if(activeNr <= arrayLength) {
                setActiveNr(0);
            }
            if(activeNr == arrayLength) {
                setActiveNr(0);
            }            
        }
        inner();
        getMessages();

        const interval = setInterval(() => {
            inner();
            getMessages();
        }, 1000);
        const longInterval = setInterval(() => {
            getMessages();
        }, 1000);
        return () => {
            clearInterval(interval);
            
        };
    }, []);



    return (
        <>
            <S.RootContainer>
                <S.HeaderContainer>
                    <S.RowContainer>
                        <S.LogoContainer>
                            <S.Logo>
                                <S.LogoElement src="logo.svg" />
                            </S.Logo>
                        </S.LogoContainer>
                        <S.ClockContainer>
                            <S.Clock>
                                {hours}:{minutes}
                            </S.Clock>
                        </S.ClockContainer>
                    </S.RowContainer>
                </S.HeaderContainer>

                <S.MiddleContainer>
                    <S.ShadowWrapper>
                        <S.RowContainer>
                            <S.ColumnContainer flex="3">
                                <S.ScheduleContainer>
                                    <S.Title>
                                        Timeplan for arrangementet!
                                    </S.Title>
                                    <Schedule agenda={agenda}>
                                        
                                    </Schedule>
                                </S.ScheduleContainer>
                            </S.ColumnContainer>
                            <S.ColumnContainer flex="2">
                                <S.PrimarySideContainer> { /* Place image/posters here */}
                                    <S.Title>
                                        Kart
                                    </S.Title>
                                </S.PrimarySideContainer>
                                <S.SecondarySideContainer> { /* Place pure text here */}
                                    <S.Title>
                                        Beskjeder fra PhoenixLAN
                                    </S.Title>
                                    <S.Text>
                                        {console.log(activeNr)}
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
                                    Våre sponsorer
                                </S.Title>
                            </S.RowContainer>

                            <S.RowContainer>
                                <S.SponsorElements>
                                    <SponsorElement value="homenet" />
                                    <SponsorElement value="askerkommune" />
                                    <SponsorElement value="bleikervgs" />
                                </S.SponsorElements>
                            </S.RowContainer>
                        </S.SponsorContainer>
                    </S.RowContainer>
                </S.BottomContainer>
            </S.RootContainer>
        </>
    )
}