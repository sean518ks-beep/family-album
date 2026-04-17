
const post = await prisma.post.findFirst({
    where: {
        id: params.id,
        familyId: session.familyId
    },
    include: {
        comments: { include: { user: true } }
    }
});
