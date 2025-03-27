import { Editor } from "./editor";

interface documentIdPageProps {
    params: Promise<{ documentId: string }>;
}

const documentIdPage = async ({ params }: documentIdPageProps) => {
    const { documentId } = await params;
    return (
        <div className="flex flex-col min-h-screen items-center justify-center gap-4 ">
            <div>DocumentId : {documentId}</div>
            <Editor />
        </div>
    )
}

export default documentIdPage