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
                componentType: "Content1",
                width: 10,
                componentState: undefined,
            } as ComponentItemConfig,
            {
                type: "component",
                title: "I'm wide",
                header: { show: "top", popout: false },
                componentType: "Content2",
                componentState: { abc: 123 },
            } as ComponentItemConfig,
        ],
    },
};

export const prefinedLayouts = {
    miniRow: miniRowConfig,
}