import React from "react";
import styled from "styled-components";
import { Schedule } from "../components/schedule";
import { SponsorElement } from "../components/sponsorElement";

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
                    font-size: 3em;
                    font-weight: 400;
                    letter-spacing: 0.2em;
                `,
                    ClockElement: styled.span`
                    `,


        MiddleContainer: styled.div`
            display: flex;
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
            SecondarySideContainer: styled.div`
                display: flex;
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
        `
}

export const Info = () => {

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
                                SoonTM
                            </S.Clock>
                        </S.ClockContainer>
                    </S.RowContainer>
                </S.HeaderContainer>

                <S.MiddleContainer>
                    <S.RowContainer>
                        <S.ColumnContainer flex="3">
                            <S.ScheduleContainer>
                                <S.Title>
                                    Timeplan for arrangementet!
                                </S.Title>
        
                                <Schedule />
                                <Schedule />
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
                                    Husk!
                                </S.Title>
                            </S.SecondarySideContainer>
                        </S.ColumnContainer>
                    </S.RowContainer>

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
                                </S.SponsorElements>
                            </S.RowContainer>
                        </S.SponsorContainer>
                    </S.RowContainer>
                </S.BottomContainer>
            </S.RootContainer>
        </>
    )
}