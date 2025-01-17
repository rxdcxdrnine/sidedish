import { useEffect, useState } from "react";
import { Container, SmallDishTitle } from "./Sidedish.style";
import { API } from "../../config";
import SidedishCards from "./SidedishCards";
import { getData } from "../../utils";
import { Carousel } from "./carousel/Carousel";

const getCurrSmallSidedishes = (page, smallSidedishes) => {
    const numberOfDishes = smallSidedishes.length;
    if (4 * page >= numberOfDishes) {
        const haveBeforeCard = numberOfDishes - 5 >= 0;
        const beforeCard = haveBeforeCard
            ? smallSidedishes[numberOfDishes - 5]
            : null;

        return [beforeCard, ...smallSidedishes.slice(numberOfDishes - 4), null];
    }
    const haveBeforeCard = page > 1;
    const haveAfterCard = 4 * page < numberOfDishes;
    const beforeCard = haveBeforeCard
        ? smallSidedishes[4 * (page - 1) - 1]
        : null;
    const afterCard = haveAfterCard ? smallSidedishes[4 * page] : null;
    return [
        beforeCard,
        ...smallSidedishes.slice(4 * (page - 1), 4 * page),
        afterCard,
    ];
};

function SmallSidedish({ isVisible, category }) {
    const { title, section } = category;

    const [smallSidedishes, setSmallSidedishes] = useState(null);
    const [page, setPage] = useState(1);
    const [lastCachedPage, setLastPage] = useState(0);
    const [hasNext, sethasNextValue] = useState(null);

    useEffect(() => {
        try {
            if (lastCachedPage < page && isVisible) {
                getData(API.DISH_SECTION + section + "&page=" + page).then(
                    (data) => {
                        if (page === 1) {
                            setSmallSidedishes(data.data);
                        } else {
                            setSmallSidedishes([
                                ...smallSidedishes,
                                ...data.data,
                            ]);
                        }
                        setLastPage(page);
                        sethasNextValue(data.hasNext);
                    }
                );
            }
        } catch (error) {
            console.error(error);
        }
    }, [isVisible, section, smallSidedishes, page, lastCachedPage]);

    if (!isVisible) {
        return;
    }

    if (!smallSidedishes) {
        return;
    }

    const onUpdatePage = (newPage) => {
        setPage(newPage);
    };

    const currSmallSidedishes = getCurrSmallSidedishes(page, smallSidedishes);

    return (
        <Container>
            <SmallDishTitle>{title}</SmallDishTitle>
            <Carousel
                page={page}
                onUpdatePage={onUpdatePage}
                currDataSize={smallSidedishes.length}
                hasNext={hasNext}
            >
                <SidedishCards dishes={currSmallSidedishes}></SidedishCards>
            </Carousel>
        </Container>
    );
}

export default SmallSidedish;
