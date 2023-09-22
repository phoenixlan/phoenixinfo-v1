import { faThumbTack, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import styled from "styled-components";

const S = {
    ScheduleElementContainer: styled.div`
        display: flex;
        gap: 2.5vw;
    `,
    Time: styled.div`
        font-family: monospace;
        position: relative;
        display: flex;
        flex-flow: column;
        color: #a455df;
        font-size: 1.4vw;
        min-width: 4vw;
        font-weight: 500;
        flex: 0;
    `,
        Day: styled.span`
            color: ${props => props.deviating ? "#ff9900" : "inherit"};
            font-size: .8vw;
            height: .8vw;
        `,
        Hour: styled.span`
            color: ${props => props.deviating ? "#ff9900" : "inherit"};
            font-size: ${props => props.small ? "1vw" : "1.4vw"};
            text-decoration: ${props => props.linethrough ? "line-through" : "none"};
            text-decoration-thickness: .15vw;
        `,
    LineElement: styled.div`
        display: flex;
        flex-flow: column;
        width: 3vw!important;
        flex: 1 3vw;
    `,
        TopLine: styled.div`
            position: relative;
            margin: auto;
            width: .2vw;
            height: 1.15vw;
            background-color: #a455df;
            opacity: ${props => props.hide ? "0" : "1"};
        `,
        Square: styled.span`
            position: relative;
            margin: auto;
            width: 1vw;
            height: 1vw;
            background-color: #a455df;
            transform: rotate(45deg);
        `,
            Icon: styled.span`
                display: flex;
                position: relative;
                bottom: 0.15vw;
                height: 1.15vw;
                font-size: 1.3vw;
                color: ${props => props.color ? props.color : "#ff9900"};
                transform: ${props => props.transform ? props.transform : null};
                z-index: 100;
            `,
                FontAwesomeIcon: styled(FontAwesomeIcon)`
                    display: flex;
                    margin: auto;
                `,

        BottomLine: styled.div`
            position: relative;
            width: .2vw;
            margin: auto;
            min-height: 1vw;
            height: auto;
            flex: 1;
            background-color: #a455df;
            opacity: ${props => props.hide ? "0" : "1"};
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
            margin: auto 0;
        `,
        ErrorDescription: styled.div`
            font-size: 1vw;
            color: #ff9900;
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
                height: 0.275vw;
            `,
            ErrorSquare: styled.div`
                display: flex;
                position: relative;
                color: #ff9900;
                font-size: 1.25vw;
                right: 0.1vw;
                margin: 0 auto;
            `,
            ErrorBottomLine: styled.div`
                position: relative;
                left: 6px;
                width: 4px;
                height: unset;
            `,

    ElementInformation: styled.div`
        position: relative;
        display: flex;
        flex-flow: column;
        margin-bottom: ${props => props.nomargin ? "0" : "1vw"};
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
                    <S.LineElement>
                        <S.TopLine hide />
                        <S.Icon>
                            <S.FontAwesomeIcon icon={faTriangleExclamation} />
                        </S.Icon>
                        <S.BottomLine hide />
                    </S.LineElement>
                    <S.ElementInformation>
                        <S.Day />
                        <S.Title>Feil med skjermen</S.Title>
                        <S.DeviatingInformation>Vi får ikke til å hente oppdateringer for infoskjermen.<br />Informasjonen som vises er kanskje utdatert.</S.DeviatingInformation>
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
                .filter(agenda => agenda.pinned)
                .map((element) => {
                    return(
                        <>
                            <S.ScheduleElementContainer>
                                <S.Time>
                                    { // Agenda entry normal time:
                                        !element.cancelled ?
                                            !element.deviating_time ?
                                                !element.deviating_time_unknown ?
                                                <>
                                                    <S.Day>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                                    <S.Hour>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                                </>
                                                : null
                                            : null
                                        : null
                                    }
                                    { // Agenda entry with deviating time, or undetermined deviating time:
                                        !element.cancelled ?
                                            element.deviating_time_unknown ?
                                                <>
                                                    <S.Day deviating>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                                    <S.Hour deviating>TBD</S.Hour>
                                                    <S.Hour small linethrough deviating>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                                </>
                                            : element.deviating_time ?
                                                <>
                                                    <S.Day deviating>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                                    <S.Hour deviating>{new Date(element.deviating_time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                                    <S.Hour small linethrough deviating>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                                </>
                                            : null
                                        : null
                                    }
                                    { // Cancelled agenda entry:
                                        element.cancelled ?
                                            <>
                                                <S.Day deviating>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                                <S.Hour deviating linethrough>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                            </>
                                        : null
                                    }
                                    </S.Time>
                                <S.LineElement>
                                    <S.TopLine hide />
                                    <S.Icon color="#d32f2f" transform="rotate(-45deg)">
                                        <S.FontAwesomeIcon icon={faThumbTack} />
                                    </S.Icon>
                                    <S.BottomLine hide />
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
                        </>
                    )
                })
            }
            {
                agenda
                .filter(agenda => !agenda.pinned)
                .filter(agenda => agenda.deviating_time ? new Date(agenda.deviating_time * 1000) > (Date.now() - 5 * 60000) : new Date(agenda.time * 1000) > (Date.now() - 5 * 60000))
                .map((element) => {
                    return(
                        <S.ScheduleElementContainer key={element.uuid}>
                            <S.Time>
                                { // Agenda entry normal time:
                                    !element.cancelled ?
                                        !element.deviating_time ?
                                            !element.deviating_time_unknown ?
                                            <>
                                                <S.Day>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                                <S.Hour>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                            </>
                                            : null
                                        : null
                                    : null
                                }
                                { // Agenda entry with deviating time, or undetermined deviating time:
                                    !element.cancelled ?
                                        element.deviating_time_unknown ?
                                            <>
                                                <S.Day deviating>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                                <S.Hour deviating>TBD</S.Hour>
                                                <S.Hour small linethrough deviating>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                            </>
                                        : element.deviating_time ?
                                            <>
                                                <S.Day deviating>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                                <S.Hour deviating>{new Date(element.deviating_time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                                <S.Hour small linethrough deviating>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                            </>
                                        : null
                                    : null
                                }
                                { // Cancelled agenda entry:
                                    element.cancelled ?
                                        <>
                                            <S.Day deviating>{new Date(element.time * 1000).toLocaleString('no', {weekday: 'short'})}</S.Day>
                                            <S.Hour deviating linethrough>{new Date(element.time * 1000).toLocaleString('no', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam'})}</S.Hour>
                                        </>
                                    : null
                                }
                                </S.Time>
                            <S.LineElement>
                                <S.TopLine />
                                {
                                    element.cancelled || element.deviating_time ?
                                    <S.Icon>
                                        <S.FontAwesomeIcon icon={faCircleExclamation} />
                                    </S.Icon>
                                    : <S.Square />
                                }
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