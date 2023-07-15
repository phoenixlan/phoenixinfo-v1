import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const S = {



    ScheduleElementContainer: styled.div`
        display: flex;
        gap: 2.5vw;
    `,
    Time: styled.div`
        position: relative;
        display: flex;
        flex-flow: column;
        color: #a455df;
        font-size: 1.4vw;
        min-width: 4vw;
        font-weight: 500;
        letter-spacing: .1vw;
        flex: 0;
    `,
        Day: styled.span`
            font-size: .8vw;
            height: .8vw;
        `,
        Hour: styled.span`
            color: ${props => props.deviating ? "#ff9900" : "inherit"};
            font-size: ${props => props.small ? "1vw" : "1.4vw"};
            text-decoration: ${props => props.linethrough ? "line-through" : "none"};
        `,
    LineElement: styled.div`
        display: flex;
        flex-flow: column;
        height: 100%;
        width: 1vw!important;
        flex: 0;
    `,
        TopLine: styled.div`
            position: relative;
            left: .375vw;
            width: .25vw;
            height: 1.3vw;
            background-color: #a455df;
        `,
        Square: styled.span`
            position: relative;
            width: 1vw;
            height: 1vw;
            background-color: #a455df;
            transform: rotate(45deg);
        `,
        BottomLine: styled.div`
            position: relative;
            left: .375vw;
            width: .25vw;
            min-height: 1vw;
            height: auto;
            flex: 1;
            background-color: #a455df;
        `,

    ErrorContainer: styled.div`
        display: flex;
        gap: 2.5vw;
        align-items: stretch;
        width: 100%!important;
    `,
        ErrorIcon: styled.div`
            color: #ff9900;
            padding: 10px;
            font-size: .5vw;
            padding-right: 20px;
        `,
        ErrorTitle: styled.div`
            font-size: 1.4vw;
            color: #ff9900;
            margin: auto 0;
        `,
        ErrorDescription: styled.div`
            font-size: 1vw;
            margin: auto 0;
        `,
        ErrorLineElement: styled.div`
            display: flex;
            flex-flow: column;
            height: 100%;
            width: 1vw!important;
            flex: 0;
        `,
            ErrorTopLine: styled.div`
                position: relative;
                left: 6px;
                width: 4px;
                height: 1em;
            `,
            ErrorSquare: styled.div`
                position: relative;
                color: #ff9900;
                font-size: 24px;
                right: 4px;
            `,
            ErrorBottomLine: styled.div`
                position: relative;
                left: 6px;
                width: 4px;
                height: 1em;
            `,

    ElementInformation: styled.div`
        position: relative;
        display: flex;
        flex-flow: column;
        margin-bottom: 1.25vw;
        flex: 1 100vw;
        
        letter-spacing: .05em;
    `,
        Title: styled.span`
            display: flex;
            font-size: 1.4vw;
            font-weight: 500;
        `,
        Text: styled.span`
            font-size: 1vw;
        `,
        DeviatingInformation: styled.span`
            font-size: 1vw;
            color: #ff9900;
        `,
}


const ErrorContainer = ({ visible }) => {
    if(visible) {
        return (
            <>
                <S.ErrorContainer>
                    <S.Time />
                    <S.ErrorLineElement>
                        <S.ErrorTopLine />
                        <S.ErrorSquare>
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                        </S.ErrorSquare>
                        <S.ErrorBottomLine />
                    </S.ErrorLineElement>
                    <S.ElementInformation>
                        <S.ErrorTitle>Feil med skjermen</S.ErrorTitle>
                        <S.ErrorDescription>Vi får ikke til å hente oppdateringer for infoskjermen, informasjonen som vises er kanskje utdatert.</S.ErrorDescription>
                    </S.ElementInformation>
                </S.ErrorContainer>
            </>
        )
    }
}

export const Schedule = ({ agenda, error }) => {
    return (
        <>
            <ErrorContainer visible={error} />
            {
                agenda
                .filter(agenda => agenda.deviating_time ? new Date(agenda.deviating_time * 1000) > (Date.now() - 5 * 60000) : new Date(agenda.time * 1000) > (Date.now() - 5 * 60000))
                .map((element) => {
                    return(
                        <S.ScheduleElementContainer key={element.uuid}>
                            <S.Time>
                                { // Agenda entry normal time
                                    !element.deviating_time
                                    ?
                                        <>
                                            <S.Day>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                            <S.Hour>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                        </>
                                    : null
                                }
                                { // Agenda entry with deviating time
                                    element.deviating_time
                                    ?
                                        <>
                                            <S.Day>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                            <S.Hour deviating>{new Date(element.deviating_time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                            <S.Hour small linethrough>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                        </>
                                    : null
                                }
                                { // Agenda entry cancelled

                                }
                                </S.Time>
                            <S.LineElement>
                                <S.TopLine />
                                <S.Square />
                                <S.BottomLine />
                            </S.LineElement>
                            <S.ElementInformation>
                                <S.Day />
                                <S.Title>{element.title}</S.Title>
                                <S.Text>
                                    {element.description}
                                </S.Text>
                                {
                                    element.deviating_information?
                                    <S.DeviatingInformation>
                                        {element.deviating_information}
                                    </S.DeviatingInformation>
                                    :null
                                }
                                
                            </S.ElementInformation>
                        </S.ScheduleElementContainer>
                    )
                })
            
            
            }
        </>
    )
}