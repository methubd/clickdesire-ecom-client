import { MutatingDots } from 'react-loader-spinner';
import './Loading.css'

const Loading = () => {
    return (
        <div className="container-loading">
            <MutatingDots
            height="100"
            width="100"
            color="#c50000"
            secondaryColor= 'rgb(20 184 166)'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </div>
    );
};

export default Loading;