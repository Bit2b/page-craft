import { Editor } from "./editor";
import { Toolbar } from "./toolbar";

interface documentIdPageProps {
    params: Promise<{ documentId: string }>;
}

const documentIdPage = async ({ params }: documentIdPageProps) => {
    const { documentId } = await params;
    return (
        <div className="flex flex-col min-h-screen items-center justify-center w-full">
            <Toolbar/>
            <Editor />
        </div>
    )
}

export default documentIdPage