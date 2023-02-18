import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const S = {



    ScheduleElementContainer: styled.div`
        display: flex;
        gap: 2em;
    `,
    Time: styled.div`
        display: flex;
        flex-flow: column;
        color: #a455df;
        font-size: 1vw;
        min-width: 3.5em;
        font-weight: 500;
        letter-spacing: .1em;
        flex: 0;
        margin-top: .1em;
    `,
        Day: styled.span`
            font-size: 0.65em;
        `,
    LineElement: styled.div`
        display: flex;
        flex-flow: column;
        height: 100%;
        flex: 0;
    `,
        TopLine: styled.div`
            position: relative;
            left: 6px;
            width: 4px;
            height: 1em;
            background-color: #a455df;
        `,
        Square: styled.div`
            position: relative;
            width: 1em;
            height: 1em;
            background-color: #a455df;
            transform: rotate(45deg);
        `,
        BottomLine: styled.div`
            position: relative;
            left: 6px;
            width: 4px;
            height: auto;
            flex: 1;
            background-color: #a455df;
        `,

    ErrorContainer: styled.div`
        display: flex;
        gap: 2em;
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
            width: 1em!important;
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
        display: flex;
        flex-flow: column;
        margin-bottom: 1em;
        flex: 1 100em;
        
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
                .filter(agenda => new Date(agenda.time * 1000) > (Date.now() - 5 * 60000))
                .map((element) => {
                    return(
                        <S.ScheduleElementContainer>
                            <S.Time>
                                <S.Day>{new Date(element.time * 1000).toLocaleString('default', {weekday: 'short'})}</S.Day>
                                {new Date(element.time * 1000).toLocaleString('default', {hour: '2-digit', minute: '2-digit'})}
                            </S.Time>
                            <S.LineElement>
                                <S.TopLine />
                                <S.Square />
                                <S.BottomLine />
                            </S.LineElement>
                            <S.ElementInformation>
                                <S.Title>{element.title}</S.Title>
                                <S.Text>
                                    {element.description}
                                </S.Text>
                            </S.ElementInformation>
                        </S.ScheduleElementContainer>
                    )
                })
            
            
            }
        </>
    )
}