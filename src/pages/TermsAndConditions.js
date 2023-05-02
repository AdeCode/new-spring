import React from 'react'
import styled from 'styled-components'

function TermsAndConditions() {
    return (
        <Wrapper className='lg:px-12 py-12'>
            <div className='bg-white p-5 rounded-lg'>
                <h1 className='title text-3xl font-bold'>
                    Terms and Conditions
                </h1>
                <p>
                    The terms and conditions set out below (the “Terms and Conditions”) apply to
                    [Springstack Technologies Limited] (the “app” or “Springstack Technologies
                    Limited”) owned and operated by Springstack Technologies Limited, which is
                    financial technology company, located in Lagos, Nigeria, and registered with the
                    Corporate Affairs Commission with RC number: 1957493. Springstack Technologies
                    Limited is committed to protecting your personal data and respects your privacy.
                    Access to, and use of, the Springstack Technologies Limited App or website are
                    subject to the Terms and Conditions.
                    For the purpose of these Terms and Conditions, “we”, “us”, and “our” all refer to
                    Springstack Technologies Limited.
                </p>
                <div className='title'>
                    1. Access to Springstack Technologies Limited
                </div>
                <p>
                    1.1
                    Access to Springstack Technologies Limited is permitted on the basis that we reserve
                    the right to change, modify, withdraw, or amend the services without notice. Please
                    check these Terms and Conditions regularly for updates. Your continued use of the
                    app following the posting of changes to these Terms and Conditions constitutes your
                    acceptance of those changes.
                </p>
                <p>
                    1.2
                    We advise that you review the Terms and Conditions diligently prior to using the app
                    or website as your use of Springstack Technologies Limited indicates your agreement
                    to be wholly bound by the Terms and Conditions without any modification. You agree
                    that if you are unsure of the meaning of any part of these Terms and Conditions or
                    have any questions regarding the Terms and Conditions, you will not hesitate to
                    contact us for clarification. No extrinsic evidence, whether oral or written, will be
                    incorporated and we will not be liable if for any reason Springstack Technologies
                    Limited is unavailable at any time or for any period
                </p>
                <p>
                    1.3
                    From time to time, we may restrict access to some parts or all of this app
                </p>
            </div>

        </Wrapper>
    )
}

export default TermsAndConditions

const Wrapper = styled.section`

.title{
    font-size: 28px;
    font-weight: 600;
    margin: 1rem 0;
}
p{
    font-size: 20px;
    font-weight: 300;
}
`