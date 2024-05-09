import React from 'react'

interface PdfChatPageProps {
    params: {
        id: string
    }
}

const PdfChatPage = ({ params }: PdfChatPageProps) => {
    const { id } = params;

    return (
        <div>{id}</div>
    )
}

export default PdfChatPage