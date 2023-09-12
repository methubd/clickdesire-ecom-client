

const SectionTitle = ({heading}) => {
    return (
        <div>
            <h1 className="uppercase text-xl text-gray-500 font-semibold py-2 text-center">{heading}</h1>
            <hr className="border border-y-2 mb-2"/>
        </div>
    );
};

export default SectionTitle;