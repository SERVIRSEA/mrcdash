import { useAtom } from "jotai"
import { activeMenuAtom } from "../state/atom"
import DroughtLegend from "./Legend/DroughtLegend"
import FFGSLegend from "./Legend/FFGSLegend";

export default function Legend() {
    const [isVisible] = useAtom(activeMenuAtom);
    return (
        <div style={{ position: 'absolute', right: '10px', bottom: '25px', background: '#eee', zIndex: 600, maxHeight: '180px', overflow: 'auto' }}>
            {isVisible === 3 && <DroughtLegend />}
            {isVisible === 2 && <FFGSLegend />}
        </div>
    );
}