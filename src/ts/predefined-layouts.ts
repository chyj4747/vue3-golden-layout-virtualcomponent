import {
    ComponentItemConfig,
    ItemType,
    LayoutConfig,
    StackItemConfig,
} from "golden-layout";

const miniRowConfig: LayoutConfig = {
    root: {
        type: ItemType.row,
        content: [
            {
                type: "component",
                title: "Title 1st",
                header: { show: "top" },
                isClosable: false,
                componentType: "ContentSecond",
                width: 10,
                componentState: undefined,
            } as ComponentItemConfig,
            {
                type: "component",
                title: "I'm wide",
                header: { show: "top", popout: false },
                componentType: "ContentFirst",
                componentState: { abc: 123 },
            } as ComponentItemConfig,
        ],
    },
};

export const prefinedLayouts = {
    miniRow: miniRowConfig,
}