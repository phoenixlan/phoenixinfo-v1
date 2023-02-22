import React from "react"
import styled from "styled-components";

const S = {
    SponsorContainer: styled.div`
        display: flex;
        margin-right: 5vw;
    `,
    Image: styled.img`
        max-height: 3.2vw;
    `
}

export const SponsorElement = (data) => {

    const sponsorLogo = "sponsors/logo_" + data.value + "." + data.type;

    return (
        <>
            <S.SponsorContainer>
                <S.Image src={sponsorLogo} alt={data.alt}/>
            </S.SponsorContainer>
        </>
    )
}