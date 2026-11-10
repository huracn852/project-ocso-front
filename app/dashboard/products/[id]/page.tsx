export default function ProductPage({
    params,
}: {
    params: {
        id: string;
    }
}) {
    return "ID here" + params.id;
}